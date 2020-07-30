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

const today = format(
  new Date(),
  "mm-dd-yyyy",
);

/**
 * Event modal
 */
const EventModal: FC<TEventModalProps> = ({
  activeEvent,
  eventsInstance,
}) => {

  /**
   * Hooks
   */

  /**
   * ========== Context hooks
   */
  const { isEventOpen, setIsEventOpen, closeEvent } = useEvents();

  const {
    // markerNode,
    // animateFromNode,
    coordinates,
    title: titleFromProps,
    address: addressFromProps,
    content: contentFromProps,
    time: timeFromProps,
  } = activeEvent || {};

  /**
   * ========== State hooks
   */
  const [title, setTitle] = useState<string>("");

  const [address, setAddress] = useState<string>("");

  const [time, setTime] = useState<string>("");

  const [content, setContent] = useState<string>("");


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

  console.log("################", event$);
  
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

  /**
   * Handlers
   */
  function handleSave() {
    const eventId = new URLSearchParams(window.location.search).get("eventId");
    if (!eventId) {
      return;
    }
    if (eventId.startsWith("new")) {
      const eventContent = {
        content: content ?? contentFromProps,
        title: title ?? titleFromProps,
        address: address ?? addressFromProps,
        time: time ?? timeFromProps,
        status: "PUBLIC",
        coordinates,
      };

      eventsInstance.createEvent(eventContent);
    }
    else {
      const eventContent = {
        content: content ?? contentFromProps,
        title: title ?? titleFromProps,
        address: address ?? addressFromProps,
        time: time ?? timeFromProps,
      };
console.log("@@ Updating event");
      eventsInstance.updateEvent(eventId, eventContent);
    }
  }

  function handleTitle(ev: ChangeEvent<HTMLInputElement>) {
    setTitle(ev.target.value);
  }

  function handleLocation(ev: ChangeEvent<HTMLInputElement>) {
    setAddress(ev.target.value);
  }

  function handleContent(ev: ChangeEvent<HTMLTextAreaElement>) {
    setContent(ev.target.value);
  }

  function handleDate(ev: ChangeEvent<HTMLInputElement>) {
    setTime(ev.target.value);
  }

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

        <IosClose
          onClick={closeEvent}
          className={styles.closeBtn}
          fontSize="40"
        />

        <div className={styles.titleInput}>
          <input
            value={!!title ? title : titleFromProps}
            onChange={handleTitle}
          />
        </div>

        <div className={styles.addressInput}>
          <IosMapOutline/>
          <input
            value={!!address ? address : addressFromProps}
            onChange={handleLocation}
          />
        </div>

        <div className={styles.dateInput}>
          <IosCalendarOutline/>
          <input
            value={!!time ? time : timeFromProps}
            onChange={handleDate}
          />
        </div>

        <div className={styles.contentInput}>
        <textarea
          value={!!content ? content : contentFromProps}
          onChange={handleContent}
        />
        </div>

        <Button
          className={styles.saveBtn}
          onClick={handleSave}
        >
          Save
        </Button>
      </motion.div>
      }
    </AnimatePresence>
  );
};

export { EventModal };
