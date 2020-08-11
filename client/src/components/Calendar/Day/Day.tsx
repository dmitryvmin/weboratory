// Libs
import React, { CSSProperties, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// UI
import {Text} from "@components/UI/Text";

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { Hour } from "@components/Calendar/Hour";
import { SLIDER_MARGIN } from "@components/Calendar/constants";
import { format } from "date-fns";
import { TimeFormatMap } from "@stores/CalendarStore";
import { start } from "repl";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

/**
 *
 */
const Day: FC<MyComponentProps> = ({
  idx,
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
  const isActive = timeScale === "DAY";
  const className = [
    classNames.segmentDay,
    isActive && classNames.isAbsolute,
  ].join(" ");

  /**
   * Utils
   */
  const getStyles = () => {
    switch (timeScale) {
      case "MINUTE":
        return ({});
      case "HOUR":
        return ({
          // backgroundColor: "rgba(255,255,255,0.2)",
        });
      case "DAY":
        return ({
          x: idx * slideWidth + (idx * SLIDER_MARGIN),
          y: 8,
          width: `${slideWidth}px`,
          height: "180px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "2px",
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
      style={getStyles()}
      className={className}
    >
      <div className={classNames.segmentLabel}>
        <Text style="label1">
          {format(getDateFromMap(date), "EEE, eo")}
        </Text>
      </div>
      {Object.keys(content).map((hour, idx) => {
        const hourContent = content[hour];
        return (
          <Hour
            key={`hour-${idx}`}
            date={{
              ...date,
              hour,
            }}
            content={hourContent}
            timeScale={timeScale}
            slideWidth={slideWidth}
          />
        );
      })}
    </motion.div>
  );
};

Day.displayName = "Day";

export { Day };
