// Libs
import React, { CSSProperties } from "react";
import { createPortal } from "react-dom";

import { CalendarEvent } from "@components/Calendar/types";
import classNames from "@components/Calendar/Second/styles.module.scss";
import { motion } from "framer-motion";
import { Dot } from "@components/Calendar/EventDots/Dot";
import { useCalendar } from "@stores/CalendarStore";

/**
 * Component hooks
 */
const EventDots = ({ date }) => {
debugger;
  /**
   * Context hooks
   */
  const {
    timeScale,
    intervalData,
  } = useCalendar();

  /**
   * Variables
   */
  const className = "";
  const segmentColumns = "60";

  // gridTemplateColumns: `repeat(${segmentColumns}, ${100}px)`,

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
        return ({
          gridTemplateColumns: `repeat(${segmentColumns}, ${1}px)`,
        });
    }
  };
debugger;
  return (
    <div style={getStyles()}>
      {intervalData && intervalData.map((event: CalendarEvent, idx: number) => {
        debugger;
        return (
            <Dot
              key={`event-${event.time}-${event.title}`}
              event={event}
            />
          )
      })}
    </div>
  );
};

export { EventDots };