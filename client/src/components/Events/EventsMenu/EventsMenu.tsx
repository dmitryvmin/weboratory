// Libs
import React, { FC, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import MdAdd from "react-ionicons/lib/MdAdd";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import styles from "./styles.module.scss";

// Store
import { useEvents } from "@stores/EventStore";

/**
 * Map address search
 */
const EventsMenu: FC<{}> = () => {

  /**
   * ========== Context hooks
   */
  const {
    isEventOpen,
    openEvent,
    closeEvent,
  } = useEvents();

  /**
   * ========== State hooks
   */
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleMenu = () => {
    if (!isEventOpen) {
      openEvent();
    }
    if (isEventOpen) {
      closeEvent();
    }
  }

  /**
   * Framer variants
   */
  const menuVariants = {
    default: {
      // opacity: 1,
      display: "initial",
    },
    eventIsOpen: {
      // opacity: 0,
      display: "none",
    },
  };

  const getAnimationState = () => {
    if (isEventOpen) {
      return "eventIsOpen";
    }
    return "default";
  };

  const getMenuIcon = () => {
    return <MdAdd/>;
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={styles.eventsMenu}
      variants={menuVariants}
      initial="default"
      animate={getAnimationState()}
      onClick={handleMenu()}
    >
      {getMenuIcon()}
    </motion.div>
  );
};

export { EventsMenu };
