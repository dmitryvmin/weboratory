import { CalendarEvent } from "@components/Calendar/types";
import classNames from "@components/Calendar/EventBlob/styles.module.scss";
import { motion } from "framer-motion";
import React from "react";

const EventBlob = () => {
  return(
    <div style={getStyles()}>
      {content && content.map((event: CalendarEvent, idx: number) => {
        return (
          <div
            key={`event-${event.time}-${event.title}`}
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
  )
}

export {EventBlob};