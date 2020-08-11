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
import { Day } from "@components/Calendar/Day";

/**
 *
 */
const Month: FC<MyComponentProps> = ({ date, content, timeScale, slideWidth }) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */


  /**
   * Variables
   */
  const isActive = timeScale === "MONTH";
  const className = [
    classNames.segmentMonth,
    timeScale === "DAY" && classNames.isRelative,
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
    switch (timeScale) {
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
      className={className}
      style={getStyles()}
    >
      {Object.keys(content).map((day, idx) => {
        const dayContent = content[day];
        return (
          <Day
            idx={idx}
            date={{
              ...date,
              day,
            }}
            key={`day-${idx}`}
            content={dayContent}
            timeScale={timeScale}
            slideWidth={slideWidth}
          />
        );
      })}
    </div>
  );
};

Month.displayName = "Month";

export { Month };
