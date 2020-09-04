// Libs
import React, { FC, useEffect, useRef, useState } from "react";
import { motion, motionValue, useAnimation, useMotionValue } from "framer-motion";

// Components
import { Move } from "@components/UI/Icon";
import { SVGBlob } from "@components/UI/SVGBlob";
import { UserAvatar } from "@components/Controls/UserAvatar";
import { CalendarMenu } from "../CalendarMenu";
import { MapMenu } from "../MapMenu";
import { TimelineDateLabel } from "@components/Controls/TimelineMenu/components/DateLabel";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Constants
import { SIZE_5, DRAG_STATUS } from "@common/constants";

// Store
import { useControlsStore } from "@stores/globalStore/stores/controls/useControlsStore";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";
import { useTimeline } from "@stores/globalStore/stores/timetable/utils/useTimeline";

// Types
export type ITimeline = any;

const x = motionValue(0);
const y = motionValue(0);

/**
 * Timeline Controls
 *
 * References:
 * - https://gist.github.com/steveruizok/6e293980318783e4fbf0abc7c43a83d8
 * - https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k?file=/src/Example.tsx:843-854
 */
const TimelineMenu: FC<ITimeline> = () => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Store Hooks
   */
  const { toggleMainMenu } = useControlsStore();

  const { mapInstance, mapRef } = useMapStore();

  const { updatePanInfo } = useTimeline();

  /**
   * Component hooks
   */
  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.INACTIVE);

  const constraintsRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef<boolean>(false);

  /**
   * Util hooks
   */
  const { windowHeight, windowWidth } = useWindowSize();

  const dragYValue = useMotionValue(0);

  const scaleValue = useMotionValue(0);

  const animate = useAnimation();

  /**
   * Handlers
   */
    // Constrain the cursor to height of the Timeline container
  const handleDrag = (event, info) => {
      updatePanInfo(info);
      isDragging.current = true;
    };

  const handleDragStart = (event, info) => {
    setDragStatus(DRAG_STATUS.ACTIVE);
  };

  const handleDragEnd = (event, info) => {
    isDragging.current = false;
    setDragStatus(DRAG_STATUS.INACTIVE);
  };

  /**
   * Render JSX
   */
  return (
    <>
      <UserAvatar/>
      <motion.div
        ref={constraintsRef}
        className={styles.timelineContainer}
        style={{
          top: windowHeight - SIZE_5,
        }}
      >
        <SVGBlob/>
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
          onDoubleClick={toggleMainMenu}
        >
          <Move fontSize="40"/>
        </motion.div>
        <CalendarMenu/>
        <TimelineDateLabel/>
        <MapMenu/>
      </motion.div>
    </>
  );
};

export { TimelineMenu };
