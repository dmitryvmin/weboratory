// Libs
import React, { CSSProperties, FC } from "react";
import { TimeScaleSegmentMap } from "@stores/CalendarStore";
import { getSegmentsForTimeScale } from "@components/Calendar/utils/getSegmentsForTimeScale";
import { addDays, addHours, addMinutes, addYears, format } from "date-fns";

// Utils

// Components

// Store

// Styles
import classNames from "./styles.module.scss";
import { CalendarEvent } from "@components/Calendar/types";
import { motion } from "framer-motion";
import { Day } from "@components/Calendar/Day";
import { Year } from "@components/Calendar/Year";

// Types

// Constants

/**
 *
 */
const Content: FC<any> = ({
  timeTable,
  data,
  timeScale,
  calendarMarker,
  slideWidth,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */

  /**
   * Variables
   */
  const segmentScale = TimeScaleSegmentMap[timeScale];

  const segments = getTimeScaleSegments();

  /**
   * Utils
   */
  function getTimeScaleSegments() {

    // switch (timeScale) {
    //   case "MINUTE":
    //     return "";
    //   case "HOUR":
    //     return "";
    //   case "DAY":
    //     content
    //     return "";
    //   case "MONTH":
    //     return "";
    //   case "YEAR":
    //     return "";
    // }
    // getSegmentsForTimeScale(timeScale, start)
  }

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */

  const renderSegments = () => {
    return Object.keys(timeTable).map((year, idx) => {
      const yearContent = timeTable[year];
      return (
        <Year
          date={{year}}
          key={`year-${idx}`}
          content={yearContent}
          timeScale={timeScale}
          slideWidth={slideWidth}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <div className={classNames.contentContainer}>
      {renderSegments()}
    </div>
  );
};

export { Content };
