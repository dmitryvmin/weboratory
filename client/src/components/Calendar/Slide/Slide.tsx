// Libs
import React, { CSSProperties, FC, memo, useEffect, useState } from "react";
import { motion, MotionStyle, TargetAndTransition, useAnimation, VariantLabels } from "framer-motion";
import { format } from "date-fns";
import { useSelector } from "react-redux";

// Utils
import { getSegDiff } from "../utils/getSegDiff";
import { cn } from "@utils/css/getClassName";

// UI
import { Text } from "@components/UI/Text";

// Calendar
import { Dot } from "@components/Calendar/EventDot";

// Constants
import { DateFormatMap, SLIDER_MARGIN } from "@components/Calendar/constants";

// Utils
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { getParentTimePeriod } from "@components/Calendar/utils/getParentTimePeriod";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";

// Styles
import classNames from "./styles.module.scss";

// Types
import { SlideProps } from "./types";
import { getStartOfPeriod } from "@components/Calendar/utils/getStartOfPeriod";
import { getTimePeriodIdx } from "@components/Calendar/utils/getTimePeriodIdx";
import { useEventsData } from "@stores/EventsDataStore/useEventsData";
import { formatDateToMapKey } from "@components/Calendar/utils/formatDateToMapKey";
import { log } from "@dmitrymin/fe-log";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { getSegmentIdxFromDate } from "@components/Calendar/utils/getSegmentIdxFromDate";

type AnimationDefinition = VariantLabels | TargetAndTransition | any;

const TRANSITION_PROPS = {
  duration: 0,
  type: "tween",
};

/**
 * Slide
 */
const Slide: FC<SlideProps> = ({
  slideTimePeriod,
  slideDateMap,
  slideContent,
  slideWidth,
}) => {

  /**
   * =============== Hooks ===============
   */
  const eventsData = useSelector(state => state.calendarReducer.eventsData);

  if (!eventsData) {
    return null;
  }

  const {
    isFullScreen,
    timePeriod: calendarTimePeriod,
    startingDate: calendarStartingDate,
  } = useCalendar();

  const controls = useAnimation();

  const { windowHeight } = useWindowSize();

  /**
   * =============== Variables ===============
   */
  const calendarParentTimePeriod = getParentTimePeriod(calendarTimePeriod);
  const calendarChildTimePeriod = getChildTimePeriod(calendarTimePeriod);
  const isContainer = slideTimePeriod === calendarParentTimePeriod;
  const isSlide = slideTimePeriod === calendarTimePeriod;
  const isSegment = slideTimePeriod === calendarChildTimePeriod;

  /**
   * =============== Effects ===============
   */
  // useEffect(() => {
  //   if (isSlide) {
  //     controls.start(getActiveSlideStyle());
  //   }
  //   // else {
  //   //   controls.start(getSlideStyle(false));
  //   // }
  // }, [
  //   calendarStartingDate,
  //   calendarTimePeriod,
  //   slideTimePeriod,
  // ]);

  /**
   * =============== Variables ===============
   */
  const slideDate = getDateFromMap(slideDateMap);

  const className = cn(
    classNames.slideBase,
    isContainer && classNames.isContainer,
    isSlide && classNames.isSlide,
  );

  /**
   * Utils
   */
  function getInactiveSlideStyle(): AnimationDefinition {
    return ({
      x: "unset",
      y: "unset",
      width: "unset",
    });
  }

  function getActiveSlideStyle(): AnimationDefinition {

    // const calendarFloor = getStartOfPeriod(calendarTimePeriod, calendarStartingDate);

    const segmentDiff = getSegDiff({
      timePeriod: calendarTimePeriod,
      from: slideDate,
      to: calendarStartingDate,
    });

    const slideX = segmentDiff * slideWidth;

    return ({
      left: slideX + (SLIDER_MARGIN / 2),
      top: 8,
      width: slideWidth - (SLIDER_MARGIN / 2),
      // height: isFullScreen ? windowHeight - 220 : 180,
    });
  }

  function getStyle() {
    if (isSlide && slideContent !== undefined) {
      return getActiveSlideStyle();
    }
  }

  /**
   * =============== JSX ===============
   */
  function renderSlideLabel() {
    if (isSlide) {
      const dateFormat = DateFormatMap[slideTimePeriod];
      const formattedDate = format(slideDate, dateFormat);
      return (
        <div className={classNames.slideLabel}>
          <Text style="label1">
            {`${formattedDate}`}
          </Text>
        </div>
      );
    }
  }

  function renderSegmentLabel() {
    if (isSegment) {
      return (
        <div className={classNames.segmentLabel}>
          <Text style="label3">
            {getSegmentIdxFromDate(slideTimePeriod, slideDate)}
          </Text>
        </div>
      );
    }
  }

  function renderEvents() {

    const sliderDateKey = formatDateToMapKey(slideTimePeriod, slideDate);

    const segmentEvents = eventsData[sliderDateKey];

    if (!segmentEvents || !segmentEvents.length) {
      return;
    }

    return segmentEvents.map((event, idx) => {
      return (
        <Dot
          key={`${slideTimePeriod}-${slideDate}-${idx}`}
          event={event}
        />
      );
    });
  }

  // TODO: Clean up...
  // Render this Slide
  function renderContent() {
    // Content is null, render empty Slide
    if (slideContent === null) {
      return renderEvents();
    }
    else if (Array.isArray(slideContent)) {

      return slideContent.map((childContent, idx) => {
        // If 0-day or undefined, return
        if (childContent === 0 || childContent === undefined) {
          return;
        }
        else {

          const slideChildTimePeriod = getChildTimePeriod(slideTimePeriod);

          const childDateMap = {
            ...slideDateMap,
            [slideChildTimePeriod]: idx,
          };

          const slideChildDate = getDateFromMap(childDateMap);

          return (
            <Slide
              key={`${calendarTimePeriod}-${slideChildTimePeriod}-${slideChildDate}`}
              slideTimePeriod={slideChildTimePeriod}
              slideDateMap={childDateMap}
              slideContent={childContent}
              slideWidth={slideWidth}
            />
          );
        }
      });
    }
  }

  /**
   * Render Component
   */
  // if (isSlide && slideContent !== undefined) {
  // return (
  //   <motion.div
  //     layout
  //     style={getActiveSlideStyle()}
  //     // animate={controls}
  //     transition={TRANSITION_PROPS}
  //     className={className}
  //   >
  //     {renderLabel()}
  //     {renderContent()}
  //   </motion.div>
  // );
  // }
  // else {
  //
  // }
  return (
    <div
      className={className}
      style={getStyle()}
    >
      {renderSegmentLabel()}
      {renderContent()}
    </div>
  );
};

Slide.displayName = "Slide";

export { Slide };
