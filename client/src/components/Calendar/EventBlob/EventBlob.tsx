// Libs
import React, { CSSProperties, FC } from "react";

// Utils

// Components

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { Hour } from "@components/Calendar/Hour";
import { CalendarEvent } from "@components/Calendar/types";
import { motion } from "framer-motion";

/**
 *
 */
const EventBlob: FC<MyComponentProps> = ({ content, timeScale }) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */


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

  /**
   * Utils
   */

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */

  const EventBlob = ({events}) => {
    return (
      <div style={getStyles()}>
        {content && content.map((event: CalendarEvent, idx: number) => {
          return (
            <div
              key={`event-${idx}`}
              className={classNames.eventContainer}
              style={{
                // gridTemplateColumns: `repeat(${segmentColumns}, ${segmentWidth})`,
                // gridRowStart: idx + 1,
              }}
            >
              <motion.div
                className={classNames.eventMarker}
                style={{
                  backgroundColor: event.color,
                }}
              >
                <div className={classNames.eventTitle}>
                  Title
                </div>
                {/*{format(event.time, "dd-mm:hh")}*/}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSeconds = () => {
    return Object.keys(content).map((minute, idx) => {
      const events = content[minute];
      return (
        <EventBlob
          key={`hour-${idx}`}
          events={events}
        />
      );
    });
  };
  /**
   * Render Component
   */
  return (
    <>
      {}
    </>
  );
};

EventBlob.displayName = "EventBlob";

export { EventBlob };
