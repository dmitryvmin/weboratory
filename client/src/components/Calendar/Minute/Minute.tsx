// Libs
import React, { CSSProperties, FC } from "react";
import { motion } from "framer-motion";

// Utils

// Components

// Store

// Constants;

// Styles
import classNames from "./styles.module.scss";

// Types
import { MinuteProps } from "./types";
import { useCalendar } from "../store";
import { Dot } from "@components/Calendar/EventDot";

/**
 *
 */
const Minute: FC<MinuteProps> = ({
  date,
  content,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */
  const { timePeriod } = useCalendar();

  /**
   * Utils
   */

  /**
   * Effects
   */

  /**
   * Variables
   */
  const className = classNames.minuteSegment;
  const segmentColumns = "60";
  // gridTemplateColumns: `repeat(${segmentColumns}, ${100}px)`,

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
        // return ({
        //   gridTemplateColumns: `repeat(${segmentColumns}, ${1}px)`,
        // });
        return ({});
    }
  };

  /**
   * Render fns
   */
  const renderMinutes = () => {
    if (!content) {
      return null;
    }
    else {
      return content.map((event) => {
        return (
          <Dot
            key={`event-${event.time}-${event.title}`}
            event={event}
          />
        );
      });
    }
  };

  /**
   * =============== JSX ===============
   */
  return (
    <motion.div
      className={className}
      style={getStyles()}
    >
      {renderMinutes()}
    </motion.div>
  );
};

Minute.displayName = "Second";

export { Minute };
