// Libs
import React, { FC} from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// Components
import { Second } from "@components/Calendar/Second";

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";

/**
 *
 */
const Hour:FC<MyComponentProps> = ({
  date,
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
  const className = classNames.segmentHour;

  /**
   * Utils
   */
  const getStyles = () => {
    switch (timeScale) {
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

  /**
   * Render Component
   */
  return (
    <motion.div
      className={className}
      style={getStyles()}
    >
      {Object.keys(content).map((minute, idx) => {
        const minuteContent = content[minute];
        return (
          <Second
            key={`minute-${idx}`}
            date={{
              ...date,
              minute,
            }}
            content={minuteContent}
            timeScale={timeScale}
          />
        );
      })}
    </motion.div>
  );
};

Hour.displayName = "Hour";

export { Hour };
