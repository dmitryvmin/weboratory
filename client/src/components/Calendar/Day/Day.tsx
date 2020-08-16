// Libs
import React, { CSSProperties, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// UI
import { Text } from "@components/UI/Text";

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { Hour } from "@components/Calendar/Hour";
import { SLIDER_MARGIN } from "@components/Calendar/constants";
import { format } from "date-fns";
import { TimeFormatMap, useCalendar } from "@stores/CalendarStore";
import { start } from "repl";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { useWindowSize } from "@utils/hooks/useWindowSize";

/**
 *
 */
const Day: FC<MyComponentProps> = ({
  date,
  content,
  idx,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Context hooks
   */
  const {
    timePeriod,
    slideCount,
  } = useCalendar();

  /**
   * Util hooks
   */
  const { windowWidth } = useWindowSize();

  /**
   * Variables
   */
  const isActive = timePeriod === "DAY";
  const className = [
    classNames.segmentDay,
    isActive && classNames.isAbsolute,
  ].join(" ");

  /**
   * Utils
   */
  const getStyles = () => {

    const slideWidth = (windowWidth - (2 * SLIDER_MARGIN)) / slideCount;
    const slideX = idx * slideWidth + (idx * SLIDER_MARGIN);

    switch (timePeriod) {
      case "MINUTE":
        return ({});
      case "HOUR":
        return ({
          // backgroundColor: "rgba(255,255,255,0.2)",
        });
      case "DAY":
        return ({
          x: slideX,
          y: 8,
          width: `${slideWidth}px`,
          height: "180px",
          backgroundColor: "rgba(255,255,255,0.5)",
          // backgroundColor: "rgba(0,0,0,0.15)",
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
  const renderDay = () => {
    if (!content) {
      return null;
    }
    debugger;
    return content.map((hour, idx) => {
      if (!hour) {
        return null;
      }
      return null;
      // return (
      //   <Hour
      //     key={`hour-${idx}`}
      //     date={{
      //       ...date,
      //       hour: idx,
      //     }}
      //     content={hour}
      //   />
      // );
    });
  };

  /**
   * Render Component
   */
  return (
    <motion.div
      style={getStyles()}
      className={className}
    >
      {date &&
      <div className={classNames.segmentLabel}>
        <Text style="label1">
          {format(getDateFromMap(date), "EEE, eo")}
        </Text>
      </div>}
      {renderDay()}
    </motion.div>
  );
};

Day.displayName = "Day";

export { Day };
