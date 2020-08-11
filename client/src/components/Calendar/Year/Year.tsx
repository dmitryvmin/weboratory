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
import { MyComponentProps } from "./types";
import { Month } from "@components/Calendar/Month";

/**
 *
 */
const Year: FC<MyComponentProps> = ({
  year,
  content,
  timeScale,
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
  const isActive = timeScale === "YEAR";
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
    switch (timeScale) {
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

  /**
   * Render Component
   */
  return (
    <div
      style={getStyles()}
      className={className}
    >
      {Object.keys(content).map((month, idx) => {
        const monthContent = content[month];
        return (
          <Month
            date={{
              ...year,
              month,
            }}
            key={`month-${idx}`}
            content={monthContent}
            timeScale={timeScale}
            slideWidth={slideWidth}
          />
        );
      })}
    </div>
  );
}

Year.displayName = "Year";

export { Year };
