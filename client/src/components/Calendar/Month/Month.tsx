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
import { useCalendar } from "@stores/CalendarStore";
import { useWindowSize } from "@utils/hooks/useWindowSize";

/**
 *
 */
const Month: FC<MonthProps> = ({
  date,
  content,
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
  const isActive = timePeriod === "MONTH";
  const className = [
    classNames.segmentMonth,
    timePeriod === "DAY" && classNames.isRelative,
  ].join(" ");

  // const timeScaleActive = timeScale === "MONTH";
  // const segmentColumns = Object.keys(monthContent).length;
  // const style = {
  //   gridTemplateColumns: `repeat(${segmentColumns}, ${320}px)`,
  // };
  // const className = [
  //   timeScaleActive
  //     ? classNames.monthSegmentActive
  //     : classNames.monthSegmentInactive,
  // ].join(" ");

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
    let idx = -1;
    return content?.map((day) => {
      if (!day) {
        return null;
      }
      idx++;
      return (
        <Day
          key={`day-${idx}`}
          idx={idx}
          date={{
            ...date,
            day: idx,
          }}
          content={day}
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
