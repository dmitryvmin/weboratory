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
import { YearProps } from "./types";
import { Month } from "@components/Calendar/Month";
import { useCalendar } from "@stores/CalendarStore";

/**
 *
 */
const Year: FC<YearProps> = ({
  date,
  content,
}) => {

  /**
   * Context hooks
   */
  const {
    timePeriod,
  } = useCalendar();

  /**
   * Variables
   */
  const isActive = timePeriod === "YEAR";
  const className = classNames.segmentYear;

  // const segmentColumns = Object.keys(yearContent).length;
  // const style = {
  //   gridTemplateColumns: `repeat(${segmentColumns}, ${320}px)`,
  // };
  // const className = [
  //   timeScaleActive
  //     ? classNames.yearSegmentActive
  //     : classNames.yearSegmentInactive,
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
        return ({});
      case "MONTH":
        return ({});
      case "YEAR":
        return ({});
      default:
        return ({});
    }
  };

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */
  const renderYear = () => {
    if (!content) {
      return;
    }
    return content.map((month, idx) => {
      if (!month) {
        return null;
      }
      return (
        <Month
          key={`month-${idx}`}
          date={{
            ...date,
            month: idx,
          }}
          content={month}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <div
      style={getStyles()}
      className={className}
    >
      {renderYear()}
    </div>
  );
};

Year.displayName = "Year";

export { Year };
