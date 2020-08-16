// Libs
import React, { CSSProperties, FC } from "react";

// Utils

// Components

// Store

// Constants
import { EventDots } from "@components/Calendar/EventDot/EventDots";

// Styles
import classNames from "./styles.module.scss";

// Types
import { MinuteProps } from "./types";
import { Hour } from "@components/Calendar/Hour";
import { useCalendar } from "@stores/CalendarStore";
import { CalendarEvent } from "@components/Calendar/types";
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
  const {
    timePeriod,
    intervalData,
  } = useCalendar();

  /**
   * Utils
   */

  /**
   * Effects
   */

  /**
   * Variables
   */
  const className = "";
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
        return ({
          gridTemplateColumns: `repeat(${segmentColumns}, ${1}px)`,
        });
    }
  };

  /**
   * Render fns
   */
  const renderMinutes = () => {
    var c = content;
debugger;
    if (!content) {
      return null;
    }
    if (content.length) {
      debugger;
    }

    return (
      <Dot
        key={`event-${content.time}-${content.title}`}
        event={content}
      />
    );
    // return content.map((event: CalendarEvent, eventIdx: number) => {
    //   return (
    //     <Dot
    //       key={`event-${event.time}-${event.title}`}
    //       event={event}
    //     />
    //   );
    // });
  };

  /**
   * =============== JSX ===============
   */
  return (
    <div style={getStyles()}>
      {renderMinutes()}
    </div>
  );

};

Minute.displayName = "Second";

export { Minute };
