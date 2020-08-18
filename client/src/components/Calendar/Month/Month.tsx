// Libs
import React, { CSSProperties, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// Components

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MonthProps } from "./types";
import { Day } from "@components/Calendar/Day";
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { useCalendar } from "@components/Calendar/store";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

/**
 *
 */
const Month: FC<MonthProps> = ({
  date,
  content,
  timePeriod,
  calendarMarker,
  slideWidth,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Variables
   */

    // const timeScaleActive = timeScale === "MONTH";
    // const segmentColumns = Object.keys(monthContent).length;
    // const style = {
    //   gridTemplateColumns: `repeat(${segmentColumns}, ${320}px)`,
    // };


  const isContainer = timePeriod === "DAY";

  const className = [
    classNames.segmentMonth,
    isContainer && classNames.isRelative,
  ].join(" ");

  /**
   * Utils
   */
  const getStyles = (): CSSProperties => {
    switch (timePeriod) {
      case "MINUTE":
        return ({});
      case "HOUR":
        return ({});
      case "DAY":
        return ({
          // Month is container
          display: "relative",
          // paddingRight: "5px",
          backgroundColor: "rgba(0,0,0,0.3)",
          // display: "grid",
          // gridTemplateColumns: "repeat(auto-fill, 120px)",
          // gridTemplateRows: "50px",
          // columnGap: "5px",
        });
      case "MONTH":
        return ({});
      case "YEAR":
        return ({});
      default:
        return ({});
    }
  };

  /**
   * =============== JSX ===============
   */
  const renderMonth = () => {
    if (!content) {
      return null;
    }
    return content?.map((day, idx) => {
      if (!day) {
        return null;
      }
      const segmentDate = {
        ...date,
        DAY: idx,
      };
      return (
        <Day
          key={`month-${getDateFromMap(segmentDate)}`}
          date={segmentDate}
          content={day}
          timePeriod={timePeriod}
          calendarMarker={calendarMarker}
          slideWidth={slideWidth}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <div
      className={className}
      style={getStyles()}
    >
      {renderMonth()}
    </div>
  );
};

Month.displayName = "Month";

export { Month };
