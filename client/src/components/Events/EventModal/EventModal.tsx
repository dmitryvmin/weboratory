// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";

// Components
import { ModalContent } from "@components/Events/EventModal/ModalContent";

// Utils
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Constants
import { MENU_SIZE, PADDING_1, PADDING_2, TIMELINE_HEIGHT } from "@common/constants";

/**
 * Event Modal
 */
const EventModal: FC<any> = ({ menuNode }) => {

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
    isMenuOpen,
  } = useEvents();

  /**
   * ========== Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  const animationControls = useAnimation();

  const { markerNode } = activeEvent || {};

  const targetBBox = getPositionFromTarget(markerNode);

  const menuBBox = getPositionFromTarget(menuNode);

  /**
   * Framer variants
   */
  const variants = {
    closedOnMarker: {
      width: 0,
      height: 0,
      x: targetBBox?.x,
      y: targetBBox?.y,
      transition: {
        type: "tween",
      },
    },
    closedOnMenuItem: {
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: menuBBox?.x,
      y: menuBBox?.y,
      transition: {
        type: "tween",
      },
    },
    closedOnMenuOrigin: {
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: (windowWidth / 2) - (MENU_SIZE / 2),
      y: windowHeight - TIMELINE_HEIGHT,
      transition: {
        type: "tween",
      },
    },
    openOnCenter: {
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: (windowWidth < 600) ? "50%" : "unset",
      y: (windowHeight / 2) - 150,
      transition: {
        type: "tween",
      },
    },
    openOnMarker: {
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: (windowWidth < 600) ? "50%" : "unset",
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
      if (isMenuOpen) {
        animationControls.start("closedOnMenuItem");
      }
      else {
        animationControls.start("closedOnMenuOrigin");
      }
    }
  }, [
    isEventOpen,
    isMenuOpen,
  ]);

  function centerModalOn(variant) {
    animationControls.start(variant);
  };

  const getInitialPosition = () => {
    if (!!markerNode) {
      return "closedOnMarker";
    }
    else {
      if (isMenuOpen) {
        return "closedOnMenuItem";
      }
      else {
        return "closedOnMenuOrigin";
      }
    }
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      ref={modalRef}
      animate={animationControls}
      variants={variants}
      className={classNames.eventModal}
      initial={getInitialPosition()}
      style={{ borderRadius: isEventOpen ? "2px" : "50%" }}
    >
      <ModalContent centerModalOn={centerModalOn}/>
    </motion.div>
  );
};

export { EventModal };
