// Libs
import React, { FC, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import MdAdd from "react-ionicons/lib/MdAdd";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "./styles.module.scss";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

// Components
import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { log } from "@utils/Logger";

// Constants
import {SEARCH_MIN} from "@stores/EventStore/constants";
import { eventsInstance } from "@components/Events/eventsInstance";
import { ModalContent } from "@components/Events/EventModal/ModalContent";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

/**
 * Map address search
 */
const EventModal: FC<{}> = () => {

  /**
   * ========== Context hooks
   */
  const {
    isEventOpen,
    closeEvent,
    openEvent,
    startNewEvent,
    activeEvent,
  } = useEvents();

  /**
   * ========== State hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * ========== Util hooks
   */
  const { windowWidth, windowHeight } = useWindowSize();

  const animateFromBBox = getPositionFromTarget(activeEvent?.markerNode);

  /**
   * Framer variants
   */
  const containerVariant = {
    closed : {
      borderRadius: "50%",
      width: animateFromBBox ? 1 : 50,
      height: animateFromBBox ? 1 : 50,
      x: animateFromBBox ? animateFromBBox?.x : (windowWidth - 60),
      y: animateFromBBox ? animateFromBBox?.y : (windowHeight - 120),
      opacity: 0,
      transition: {
        type: "tween",
      },
    },
    open: {
      borderRadius: "2px",
      width: 460,
      height: 300,
      x: "calc(50vw - 230px)",
      y: "calc(50vh - 150px)",
      opacity: 1,
      transition: {
        type: "tween",
      },
    },
  };


  const buttonVariants = {
    closed: {
      display: "flex",
    },
    open: {
      transitionEnd: {
        display: "none",
      },
    },
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={styles.container}
      variants={containerVariant}
      initial={true}
      animate={isEventOpen ? "open" : "closed"}
    >
      {isEventOpen && <ModalContent activeEvent={activeEvent} eventsInstance={eventsInstance}/>}
      <motion.div
        onClick={startNewEvent}
        animate={isEventOpen ? "open" : "closed"}
        variants={buttonVariants}
        className={styles.addBtn}
      >
        <MdAdd/>
      </motion.div>
      {/*<motion.div*/}
      {/*  onClick={() => closeEvent}*/}
      {/*  animate={isEventOpen ? "open" : "closed"}*/}
      {/*  variants={buttonVariants}*/}
      {/*>*/}
      {/*  <IosClose*/}
      {/*    fontSize="40"*/}
      {/*    className={styles.closeBtn}*/}
      {/*  />*/}
      {/*</motion.div>*/}
    </motion.div>
  );
};

export { EventModal };
