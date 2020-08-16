// Libs
import React, { FC } from "react";
import { useCalendar } from "@stores/CalendarStore";

// Utils
import { log } from "@dmitrymin/fe-log";

// Components
import { Year } from "@components/Calendar/Year";

// Store

// Styles
import classNames from "./styles.module.scss";

// Types

// Constants

/**
 *
 */
const Content: FC<any> = ({
  timeTable,
  // data,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Context hooks
   */
  const {
    timePeriod,
  } = useCalendar();

  /**
   * Variables
   */
  // const segments = getTimeScaleSegments();

  /**
   * Utils
   */
  // function getTimeScaleSegments() {
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
  // }

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */
  const renderYears = () => {
    for (const year in timeTable) {
      const yearContent = timeTable[year];
      if (!yearContent) {
        return null
      }
      return (
        <Year
          key={`year-${year}`}
          date={{ year: parseInt(year) }}
          content={yearContent}
        />
      );
    }
  };

  /**
   * Render Component
   */
  return (
    <>
      {renderYears()}
    </>
  );
  // return (
  //   <div className={classNames.contentContainer}>
  //     {renderYears()}
  //   </div>
  // );
};

export { Content };