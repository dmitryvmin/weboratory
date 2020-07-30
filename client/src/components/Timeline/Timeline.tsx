// Libs
import React, { FC, useRef } from "react";
import { motion, motionValue, useAnimation, useMotionValue } from "framer-motion";
import IosMove from "react-ionicons/lib/IosMove";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Store
import { useCalendar } from "@stores/CalendarStore";

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
   * Hooks
   */
  const constraintsRef = useRef<HTMLDivElement>(null);

  const { setCalendarIsOpen, moveLeft, moveRight } = useCalendar();

  const { windowHeight, windowWidth } = useWindowSize();

  const dragYValue = useMotionValue(0);
  const scaleValue = useMotionValue(0);

  const animate = useAnimation();
  // const dragControls = useDragControls();

  /**
   * Handlers
   */
    // Constrain the cursor to height of the Timeline container
  const handleDrag = (event, info) => {
      const {
        point: {
          x: px,
          y: py,
        },
        offset: {
          x: ox,
          y: oy,
        },
      } = info;

      // If y dips below the container, set it to 0
      if (py > windowHeight - 20) {
        // console.log("Cursor below too low", py);
        // animate.set({
        //   y: 0,
        // });
        setCalendarIsOpen(false);
      }

      if (py < window.innerHeight - 100) {
        // console.log("Cursor below too high", py);
        // animate.set({
        //   y: 0,
        // });
        setCalendarIsOpen(true);
      }

      if (ox < -50) {
        moveRight(ox);
      }

      if (ox > 50) {
        moveLeft(ox);
      }

    };

  // Spring back to radius, if overdragged
  const handleDragEnd = (event, info) => {
    // const { x: px, y: py } = info.point;
    // console.log("@@ handleDragEnd");
    // animate.set({
    //   scale: 1,
    // });
  };

  /**
   * Render JSX
   */
  return (
    <div className={styles.timelineContainer} ref={constraintsRef}>
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
        // onDragEnd={handleDragEnd}
      >
        <IosMove fontSize="40"/>
      </motion.div>
    </div>
  );
};

export { Timeline };
