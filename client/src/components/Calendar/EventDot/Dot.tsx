// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

// Utils

// Components

// Store
import { useCalendar } from "@stores/CalendarStore";

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";

/**
 *
 */
const Dot: FC<MyComponentProps> = ({ event }) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */
  const dotRef = useRef<HTMLDivElement>(null);

  /**
   * Context hooks
   */
  const {
    intervalData,
    // sliderRef,
  } = useCalendar();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /**
   * Utils
   */

  /**
   * Effects
   */
  useEffect(() => {
    if (dotRef === null) {
      return;
    }
  }, [
    dotRef,
  ]);

  /**
   * =============== JSX ===============
   */

  /**
   * Render Component
   */
  return (
    <motion.div
      key={`event-${event.time}-${event.title}`}
      ref={dotRef}
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
    </motion.div>
  );
};

export { Dot };
