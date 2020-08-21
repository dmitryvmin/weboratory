// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Rnd } from "react-rnd";

// Utils

// Components

// Store
import { useCalendar } from "@components/Calendar/hooks/useCalendar/useCalendar";

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { DotProps } from "./types";

/**
 * Event Dot Calendar Marker
 */
const Dot: FC<DotProps> = ({ event }) => {

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
      ref={dotRef}
      className={classNames.eventMarker}
    >
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        }}
        className={classNames.eventDot}
        style={{
          backgroundColor: event.color,
        }}
      />
      {/*<div*/}
      {/*  className={classNames.eventDot}*/}
      {/*  style={{*/}
      {/*    backgroundColor: event.color,*/}
      {/*  }}*/}
      {/*>*/}
        {/*<div className={classNames.eventTitle}>*/}
        {/*  Title*/}
        {/*</div>*/}
      {/*</div>*/}
    </motion.div>
  );
};

export { Dot };
