// Libs
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// Components
import { Minute } from "@components/Calendar/Minute";

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { useCalendar } from "@stores/CalendarStore";

/**
 *
 */
const Hour: FC<MyComponentProps> = ({
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
  const className = classNames.segmentHour;

  /**
   * Utils
   */
  const getStyles = () => {
    switch (timePeriod) {
      case "MINUTE":
        return ({});
      case "HOUR":
        return ({});
      case "DAY":
        return ({
          display: "grid",
          gridAutoFlow: "column",
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
  const renderMinute = () => {
    debugger;
    if (!content) {
      return null;
    }
    return content.map((minute, idx) => {
      return (
        <Minute
          key={`minute-${idx}`}
          content={minute}
          date={{
            ...date,
            minute: idx,
          }}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <motion.div
      className={className}
      style={getStyles()}
    >
      {renderMinute()}
    </motion.div>
  );
};

Hour.displayName = "Hour";

export { Hour };
