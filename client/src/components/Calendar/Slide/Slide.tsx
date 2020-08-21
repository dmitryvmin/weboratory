// Libs
import React, { CSSProperties, FC, memo, useEffect, useState } from "react";
import { motion, MotionStyle, TargetAndTransition, useAnimation, VariantLabels } from "framer-motion";
import { format } from "date-fns";

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

type AnimationDefinition = VariantLabels | TargetAndTransition | any;

const TRANSITION_PROPS = {
  duration: 0,
  type: "tween",
};

/**
 * Slide
 */
const Slide: FC<SlideProps> = memo(({
    slideTimePeriod,
    slideDateMap,
    slideContent,
    slideWidth,
    calendarTimePeriod,
    calendarStartingDate,
  }) => {

    /**
     * =============== Variables ===============
     */
    const calendarParentTimePeriod = getParentTimePeriod(calendarTimePeriod);
    const isContainer = slideTimePeriod === calendarParentTimePeriod;
    const isSlide = slideTimePeriod === calendarTimePeriod;

    /**
     * =============== Hooks ===============
     */
    const controls = useAnimation();

    const { intervalEventsDataMap } = useEventsData();

    const { isFullScreen } = useCalendar();

  const { windowHeight } = useWindowSize();

    /**
     * =============== Effects ===============
     */
    useEffect(() => {
      if (isSlide) {
        controls.start(getActiveSlideStyle());
      }
      // else {
      //   controls.start(getSlideStyle(false));
      // }
    }, [
      calendarStartingDate,
      calendarTimePeriod,
      slideTimePeriod,
    ]);

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

      const calendarFloor = getStartOfPeriod(calendarTimePeriod, calendarStartingDate);

      const segmentDiff = getSegDiff({
        timePeriod: calendarTimePeriod,
        from: slideDate,
        to: calendarFloor,
      });

      const slideX = segmentDiff * slideWidth;

      return ({
        left: slideX + (SLIDER_MARGIN / 2),
        top: 8,
        width: slideWidth - (SLIDER_MARGIN / 2),
        height: isFullScreen ? windowHeight - 140 : 180,
      });
    }

    /**
     * =============== JSX ===============
     */
    function renderLabel() {
      if (isSlide) {
        const dateFormat = DateFormatMap[slideTimePeriod];
        const formattedDate = format(slideDate, dateFormat);
        return (
          <div className={classNames.segmentLabel}>
            <Text style="label1">
              {`${formattedDate}`}
            </Text>
          </div>
        );
      }
    }

    function renderEvents() {

      const sliderDateKey = formatDateToMapKey(slideTimePeriod, slideDate);
      const segmentEvents = intervalEventsDataMap[sliderDateKey];

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

            const childDate = getDateFromMap(childDateMap);

            return (
              <Slide
                // key={`${calendarTimePeriod}-${slideDate}-${childDate}`}
                key={`${slideChildTimePeriod}-${childDate}`}
                slideTimePeriod={slideChildTimePeriod}
                slideDateMap={childDateMap}
                slideContent={childContent}
                slideWidth={slideWidth}
                calendarTimePeriod={calendarTimePeriod}
                calendarStartingDate={calendarStartingDate}
              />
            );
          }
        });
      }
    }

    /**
     * Render Component
     */
    if (isSlide) {
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
      return (
        <div
          style={getActiveSlideStyle()}
          className={className}
        >
          {renderLabel()}
          {renderContent()}
        </div>
      );
    }
    else {
      return (
        <div className={className}>
          {renderContent()}
        </div>
      );
    }
  }
);

Slide.displayName = "Slide";

export { Slide };
