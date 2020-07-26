// Libs
import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Components
import { Button } from "@components/UI/Button";

// Types
import { TEventModal } from "../types";

const EventModal: FC<TEventModal> = (props) => {
  const {
    setEventOpen,
    mapInstance,
    startPosition,
    startFromSearch,
    coordinates,
  } = props;

  /**
   * Hooks
   */
  const [initOpen, setInitOpen] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const containerRef = useRef(null);
  const {windowWidth} = useWindowSize();
  const endPosition = mapInstance.project(coordinates);

  const searchVariants = {
    closed: {
      borderRadius: (startFromSearch && initOpen) ? "0%" : "50%",
      width: (startFromSearch && initOpen) ? 300 : 7,
      height: (startFromSearch && initOpen) ? 27 : 7,
      x: initOpen ? startPosition.x : endPosition.x - 8,
      y: initOpen ? startPosition.y : endPosition.y - 20,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      borderRadius: "0%",
      width: windowWidth > 620 ? 600 : "calc(100vw - 20px)",
      height: 350,
      x: windowWidth > 620 ? windowWidth / 2 - 300 : 10,
      y: 350,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    closed: {
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "block",
    },
  };

  useEffect(() => {
    setInitOpen(false);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setIsOpen(true);
    }
  }, [containerRef]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setEventOpen(false), 500);
    }
  }, [isOpen]);

  function handleSave() {

  }

  return (
    <motion.div
      variants={searchVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className={styles.event}
      ref={containerRef}
      exit="closed"
    >
      <>
        <motion.button
          animate={isOpen ? "open" : "closed"}
          variants={buttonVariants}
          onClick={() => setIsOpen(false)}
        >
          Close
        </motion.button>

        <Button onClick={handleSave}>Save</Button>
        {/*<EventTitle address={address}/>*/}
      </>
    </motion.div>
  );
};

export { EventModal };
