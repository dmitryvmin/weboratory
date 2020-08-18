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
import { useCalendar } from "../store";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

/**
 *
 */
const Hour: FC<MyComponentProps> = ({
  date,
  content,
  timePeriod,
  slideWidth,
}) => {

  /**
   * =============== Hooks ===============
   */

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
          gridAutoFlow: "row",
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
    if (!content) {
      return null;
    }
    return content.map((minute, idx) => {
      if (!minute) {
        return null;
      }
      const segmentDate = {
        ...date,
        MINUTE: idx,
      };
      return (
        <Minute
          key={`hour-${getDateFromMap(segmentDate)}`}
          content={minute}
          date={segmentDate}
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
