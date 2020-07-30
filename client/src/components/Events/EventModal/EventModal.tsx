// Libs
import React, { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import IosMapOutline from "react-ionicons/lib/IosMapOutline";
import IosCalendarOutline from "react-ionicons/lib/IosCalendarOutline";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Components
import { Button } from "@components/UI/Button";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

// Services
import { eventsService } from "@api/services/eventsService";

// Utils
import { useObservable } from "@utils/hooks/useObservable";

// Types
import { IEvent } from "@common/types";
import { TEventModalProps } from "./types";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";
import { ModalContent } from "@components/Events/EventModal/ModalContent";
import { eventsInstance } from "@components/Events/eventsInstance";

const today = format(
  new Date(),
  "mm-dd-yyyy",
);

/**
 * Event modal
 */
const EventModal: FC<TEventModalProps> = () => {

  /**
   * ========== Context hooks
   */
  const { activeEvent, isEventOpen, setIsEventOpen, closeEvent } = useEvents();

    // const eventInstance = useRef(new eventsService());

  const containerRef = useRef(null);

  /**
   * ========== Util hooks
   */
  const event$ = useObservable<IEvent>(eventsInstance.onEvent());

  const controls = useAnimation();

  const { windowWidth, windowHeight } = useWindowSize();

  // const endPosition = useMemo(() => {
  //   if (!mapInstance || !coordinates) {
  //     return;
  //   }
  //   return mapInstance?.project(coordinates);
  // }, [
  //   activeEvent,
  // ]);

  // const animateFromBBox = activeEvent?.animateFromNode
  //   ? activeEvent.animateFromNode.getBoundingClientRect()
  //   : undefined;

  const animateFromBBox = activeEvent?.markerNode
    ? activeEvent.markerNode.getBoundingClientRect()
    : undefined;

  const animateToBBox = activeEvent?.markerNode
    ? activeEvent.markerNode.getBoundingClientRect()
    : undefined;

  /**
   * Framer variants
   */
  const variants = {
    initial: {
      borderRadius: "50%",
      width: 0,
      height: 0,
      x: animateFromBBox?.x,
      y: animateFromBBox?.y,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    closed: {
      borderRadius: "50%",
      width: 0,
      height: 0,
      x: animateToBBox?.x ?? windowWidth / 2,
      y: animateToBBox?.y ?? windowHeight / 2,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      borderRadius: "0%",
      width: windowWidth > 620 ? 600 : "calc(100vw - 20px)",
      height: 300,
      x: windowWidth > 620 ? windowWidth / 2 - 300 : 10,
      y: 300,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
  };

  console.log("@@@@@@@", "isEventOpen", isEventOpen, "activeEvent", activeEvent);

  return (
    <AnimatePresence>
      {isEventOpen &&
      <motion.div
        variants={variants}
        initial="closed"
        animate={isEventOpen ? "open" : "closed"}
        className={styles.event}
        ref={containerRef}
        exit="closed"
      >
        {/*<EventTitle address={address}/>*/}
        <ModalContent activeEvent={activeEvent} eventsInstance={eventsInstance}/>
      </motion.div>
      }
    </AnimatePresence>
  );
};

export { EventModal };
