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
import {EventModal} from "../EventModal";

// Constants
import {SEARCH_MIN} from "@stores/EventStore/constants";
import { eventsInstance } from "@components/Events/eventsInstance";
import { ModalContent } from "@components/Events/EventModal/ModalContent";

/**
 * Map address search
 */
const AddNewEvent: FC<{}> = () => {

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

  /**
   * Framer variants
   */
  const containerVariant = {
    closed: {
      borderRadius: "50%",
      width: 50,
      height: 50,
      x: windowWidth - 60,
      y: windowHeight - 120,
      transition: {
        type: "tween",
      },
    },
    open: {
      borderRadius: "3px",
      width: 300,
      height: 200,
      x: "calc(50vw - 150px)",
      y: "calc(50vh)",
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

export { AddNewEvent };
