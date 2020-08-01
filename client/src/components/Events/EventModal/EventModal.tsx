// Libs
import React, { FC, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";

// Components
import { ModalContent } from "@components/Events/EventModal/ModalContent";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";
import { MENU_SIZE, PADDING_1, PADDING_2, TIMELINE_HEIGHT } from "@common/constants";

/**
 * Map address search
 */
const EventModal: FC<{}> = () => {

  /**
   * ========== Component hooks
   */
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Context hooks
   */
  const {
    activeEvent,
    isEventOpen,
  } = useEvents();

  /**
   * ========== Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  const animationControls = useAnimation();


  const { width: modalWidth } = getPositionFromTarget(modalRef?.current) || { width: 0 };

  /**
   * Framer variants
   */
  const { markerNode } = activeEvent || {};
  const animateFromBBox = getPositionFromTarget(markerNode);

  const variants = {
    // closedOnMarker: {
    //   borderRadius: "50%",
    //   width: 0,
    //   height: 0,
    //   x: animateFromBBox?.x,
    //   y: animateFromBBox?.y,
    //   transition: {
    //     type: "tween",
    //   },
    // },
    // closedOnMenu: {
    //   borderRadius: "50%",
    //   width: MENU_SIZE,
    //   height: MENU_SIZE,
    //   x: windowWidth - MENU_SIZE - PADDING_1,
    //   y: windowHeight - TIMELINE_HEIGHT - MENU_SIZE - PADDING_1,
    //   transition: {
    //     type: "tween",
    //   },
    // },
    closed: (animateFromBBox) => ({
      borderRadius: "50%",
      width: animateFromBBox ? 0 : MENU_SIZE,
      height: animateFromBBox ? 0 : MENU_SIZE,
      x: animateFromBBox ? animateFromBBox?.x : (windowWidth/2 - MENU_SIZE/2),
      left: "unset",
      y: animateFromBBox ? animateFromBBox?.y : (windowHeight - MENU_SIZE - PADDING_2),
      transition: {
        type: "tween",
      },
    }),
    openOnCenter: {
      borderRadius: "2px",
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: "50%",
      y: (windowHeight / 2) - 150,
      transition: {
        type: "tween",
      },
    },
    openOnMarker: {
      borderRadius: "2px",
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: "50%",
      y: (windowHeight / 2) - 50,
      transition: {
        type: "tween",
      },
    },
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (isEventOpen) {
      animationControls.start("openOnCenter");
    }
    else {
      animationControls.start("closed");
    }
  }, [
    isEventOpen,
  ]);

  const centerModalOn = (variant) => {
    animationControls.start(variant);
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      ref={modalRef}
      animate={animationControls}
      variants={variants}
      className={styles.eventModal}
      custom={animateFromBBox}
      initial="closed"
      // initial={markerNode ? "closedOnMarker" : "closedOnMenu"}
    >
      <ModalContent centerModalOn={centerModalOn}/>
    </motion.div>
  );
};

export { EventModal };
