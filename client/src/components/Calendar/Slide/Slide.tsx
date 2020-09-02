// Libs
import React, { HTMLAttributes, DetailedHTMLProps, FC } from "react";
import { motion, MotionStyle, TargetAndTransition, useAnimation, VariantLabels } from "framer-motion";
import { format } from "date-fns";
import { useSelector } from "react-redux";

// Utils
import { cn } from "@utils/css/getClassName";
import { getChildTimePeriod } from "@utils/date/getChildTimePeriod";
import { getDateFromMap } from "@utils/date/getDateFromMap";
import { getParentTimePeriod } from "@utils/date/getParentTimePeriod";
import { getEndOfPeriod } from "@utils/date/getEndOfPeriod";
import { formatDateToMapKey } from "@utils/date/formatDateToMapKey";
import { getSegDiff } from "@utils/date/getSegDiff";

// UI
import { Text } from "@components/UI/Text";

// Calendar
import { CalendarMarker } from "@components/Calendar/CalendarMarker";

// Constants
import { DateFormatMap, SegmentTimeFormatMap, SLIDER_MARGIN } from "@components/Calendar/constants";

// Utils


// Styles
import classNames from "./styles.module.scss";

// Types
import { SlideProps } from "./types";

// Store
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";
import { useTimetableStore } from "@stores/globalStore/stores/timetable/utils/useTimetableStore";
import { useSliderStore } from "@stores/globalStore/stores/slider/useSliderStore";

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
}) => {

  /**
   * =============== Hooks ===============
   */
  const {
    calTimePeriod,
    calStartDate,
    setHoveredSegment,
  } = useCalendarStore();

  const { inViewEventsData } = useTimetableStore();

  const { slideWidth } = useSliderStore();

  if (!inViewEventsData) {
    return null;
  }

  const controls = useAnimation();

  /**
   * =============== Variables ===============
   */
  const calParentTimePeriod = getParentTimePeriod(calTimePeriod);

  const calChildTimePeriod = getChildTimePeriod(calTimePeriod);

  const isContainer = slideTimePeriod === calParentTimePeriod;

  const isSlide = slideTimePeriod === calTimePeriod;

  const isSegment = slideTimePeriod === calChildTimePeriod;

  const slideDate = getDateFromMap(slideDateMap);

  const className = cn(
    classNames.slide,
    isContainer && classNames.isContainer,
    isSlide && classNames.isSlide,
  );

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
   * Handlers
   */
  function getParams() {
    if (isSegment) {
      const params: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {};
      params.onMouseEnter = () => {
        return setHoveredSegment({
          startDate: slideDate,
          endDate: getEndOfPeriod(slideTimePeriod, slideDate),
        });
      };
      params.onMouseLeave = () => {
        return setHoveredSegment(undefined);
      };
      return params;
    }
  }

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
      timePeriod: calTimePeriod,
      from: slideDate,
      to: calStartDate,
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
    if (!isSlide) {
      return;
    }
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

  function renderSegmentLabel() {
    if (!isSegment || slideTimePeriod === "MINUTE") {
      return;
    }
    const dateFormat = SegmentTimeFormatMap[slideTimePeriod];
    const formattedDate = format(slideDate, dateFormat);

    return (
      <div className={classNames.segmentLabel}>
        <Text style="label3">
          {`${formattedDate}`}
        </Text>
      </div>
    );
  }

  function renderEvents() {

    const sliderDateKey = formatDateToMapKey(slideTimePeriod, slideDate);

    const segmentEvents = inViewEventsData[sliderDateKey];

    if (!segmentEvents || !segmentEvents.length) {
      return;
    }

    return segmentEvents.map((event, idx) => {
      return (
        <CalendarMarker
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
              key={`${calTimePeriod}-${slideChildTimePeriod}-${slideChildDate}`}
              slideTimePeriod={slideChildTimePeriod}
              slideDateMap={childDateMap}
              slideContent={childContent}
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
      {...getParams()}
    >
      {renderSlideLabel()}
      {renderSegmentLabel()}
      {renderContent()}
    </div>
  );
};

Slide.displayName = "Slide";

export { Slide };
