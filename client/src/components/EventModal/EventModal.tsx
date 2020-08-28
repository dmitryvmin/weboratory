// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";

// Components

// Utils
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Constants
import { MENU_SIZE, PADDING_1, PADDING_2, TIMELINE_HEIGHT } from "@common/constants";
import { ModalContent } from "./ModalContent";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";
import { getIsEventModalOpen } from "@stores/globalStore/stores/event/eventSelectors";

/**
 * Event Modal
 */
const EventModal: FC<any> = ({ menuNode }) => {

  /**
   * ========== Component hooks
   */
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    isEventModalOpen,
    eventModal,
    event,
  } = useEventStore();

  const { windowWidth, windowHeight } = useWindowSize();

  const animationControls = useAnimation();

  // if (!isEventModalOpen) {
  //   return null;
  // }

  /**
   * ========== Vars
   */
  const { markerNode } = eventModal || {};

  /**
   * ========== Utils
   */
  const menuBBox = getPositionFromTarget(menuNode);

  /**
   * Framer variants
   */
  const variants = {
    closedOnMarker: n => ({
      width: 0,
      height: 0,
      x: getPositionFromTarget(n)?.x,
      y: getPositionFromTarget(n)?.y,
      borderRadius: "50%",
      transition: {
        type: "tween",
      },
    }),
    closedOnMenuItem: {
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: menuBBox?.x,
      y: menuBBox?.y,
      borderRadius: "50%",
      transition: {
        type: "tween",
      },
    },
    closedOnMenuOrigin: {
      width: MENU_SIZE,
      height: MENU_SIZE,
      x: (windowWidth / 2) - (MENU_SIZE / 2),
      y: windowHeight - TIMELINE_HEIGHT,
      borderRadius: "50%",
      transition: {
        type: "tween",
      },
    },
    openedOnCenter: {
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: (windowWidth < 600) ? "50%" : "unset",
      y: (windowHeight / 2) - 150,
      borderRadius: 2,
      transition: {
        type: "tween",
      },
    },
    openedOnTop: {
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: (windowWidth < 600) ? "50%" : "unset",
      y: (windowHeight / 2) - 300,
      borderRadius: 2,
      transition: {
        type: "tween",
      },
    },
    openedOnBottom: {
      width: (windowWidth < 520) ? "calc(100% - 20px)" : 500,
      height: 300,
      x: (windowWidth < 600) ? "-50%" : (windowWidth / 2 - 250),
      left: (windowWidth < 600) ? "50%" : "unset",
      y: (windowHeight / 2) - 50,
      borderRadius: 2,
      transition: {
        type: "tween",
      },
    },
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (!isEventModalOpen) {
      if (markerNode) {
        animationControls.start("closedOnMarker");
      }
      else {
        animationControls.start("closedOnMenuOrigin");
      }
    }
    else {
      if (markerNode) {
        animationControls.start("openedOnCenter");
      }
    }
    // if (markerNode) {
    //   animationControls.start("openedOnBottom");
    // }
    // else {
    //   animationControls.start("openedOnCenter");
    // }
    // else {
    //   if (isMenuOpen) {
    //     animationControls.start("closedOnMenuItem");
    //   }
    //   else {
    //     animationControls.start("closedOnMenuOrigin");
    //   }
    // }
  }, [
    isEventModalOpen,
  ]);

  /**
   * Utils
   */
  function centerModalOn(variantName) {
    const variant = variants[variantName];
    animationControls.start(variant);
  }

  function getInitialPosition() {
    if (markerNode) {
      return "closedOnMarker";
    }
    else {
      return "closedOnMenuOrigin";
    }
    // else {
    //   if (isMenuOpen) {
    //     return "closedOnMenuItem";
    //   }
    //   else {
    //     return "closedOnMenuOrigin";
    //   }
    // }
  }

  function getExitPosition() {
    if (markerNode) {
      return "closedOnMarker";
    }
    else {
      return "closedOnMenuOrigin";
    }
  }

  /**
   * Return JSX
   */
  return (
    <AnimatePresence>
      {isEventModalOpen && (
        <motion.div
          // key={event.eventId}
          custom={markerNode}
          ref={modalRef}
          animate={animationControls}
          variants={variants}
          className={classNames.eventModal}
          initial={getInitialPosition()}
          exit={getExitPosition()}
        >
          <ModalContent centerModalOn={centerModalOn}/>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { EventModal };
