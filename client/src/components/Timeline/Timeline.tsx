// Libs
import React, { FC, useEffect, useRef, useState } from "react";
import { motion, motionValue, useAnimation, useMotionValue } from "framer-motion";

// Components
import { Move } from "@components/UI/Icon";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Store
import { TIMELINE_HEIGHT, DRAG_STATUS } from "@common/constants";
import { useEvents } from "@stores/EventStore";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { useTimeline } from "@components/Timeline/useTimeline";

// Types
export type ITimeline = any;

const SVGBlob = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend
            in="SourceGraphic"
            in2="goo"
          />
        </filter>
      </defs>
    </svg>
  );
};

const x = motionValue(0);
const y = motionValue(0);

/**
 * Timeline Controls
 *
 * References:
 * - https://gist.github.com/steveruizok/6e293980318783e4fbf0abc7c43a83d8
 * - https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k?file=/src/Example.tsx:843-854
 */
const Timeline: FC<ITimeline> = () => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Component hooks
   */
  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef<boolean>(false);

  const {updatePanInfo} = useTimeline();

  /**
   * Context hooks
   */
  const { isMenuOpen, setIsMenuOpenTo } = useEvents();

  /**
   * Util hooks
   */
  const { windowHeight, windowWidth } = useWindowSize();

  const dragYValue = useMotionValue(0);

  const scaleValue = useMotionValue(0);

  const animate = useAnimation();

  /**
   * Effects
   */
  // Throttle swipe events
  // useEffect(() => {
  //   if (dragStatus !== DRAG_STATUS.DRAG_STARTED) {
  //     return;
  //   }
  //
  //   const interval = setInterval(() => {
  //     isDragging.current = false;
  //   }, 500);
  //
  //   return () => clearInterval(interval);
  // }, [
  //   dragStatus,
  // ]);

  /**
   * Handlers
   */
    // Constrain the cursor to height of the Timeline container
  const handleDrag = (event, info) => {

      updatePanInfo(info);

      // On First Drag set
      // if (isDragging.current === false) {
      //   moveTimelineXDistance(ox);
      // }

      isDragging.current = true;
    };

  const handleDragStart = (event, info) => {
    setDragStatus(DRAG_STATUS.DRAG_STARTED);
  };

  const handleDragEnd = (event, info) => {
    isDragging.current = false;
    setDragStatus(DRAG_STATUS.DRAG_ENDED);
  };

  /**
   * Render JSX
   */
  return (
    <motion.div
      ref={constraintsRef}
      className={styles.timelineContainer}
      style={{
        top: windowHeight - TIMELINE_HEIGHT,
      }}
    >
      <div className={styles.svgFilter}>
        <SVGBlob/>
      </div>
      <motion.div
        className={styles.cursor}
        drag
        animate={animate}
        // style={{
        //   y: dragYValue,
        // }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.75}
        // dragTransition={{
        //   bounceStiffness: 600,
        //   bounceDamping: 10,
        // }}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => setIsMenuOpenTo(!isMenuOpen)}
      >
        <Move fontSize="40"/>
      </motion.div>
    </motion.div>
  );
};

export { Timeline };
