// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

// Utils

// Components

// Store
import { useCalendar } from "../store";

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { Rnd } from "react-rnd";

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
      ref={dotRef}
      className={classNames.eventMarker}
    >
      <div className={classNames.eventTitle}>
        Title
      </div>
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
      {/*/>*/}
      {/*{format(event.time, "dd-mm:hh")}*/}
    </motion.div>
  );
};

export { Dot };
