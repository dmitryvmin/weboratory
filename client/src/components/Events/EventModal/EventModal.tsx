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
const EventModal: FC<TEventModalProps> = () => {

  /**
   * Hooks
   */

  /**
   * ========== Context hooks
   */
  const { mapInstance, setMapCenterCoords, mapCenterCoords } = useMap();

  const { isEventOpen, activeEvent, setIsEventOpen } = useEvents();

  const {
    markerNode,
    animateFromNode,
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


  const eventInstance = useRef(new eventsService());

  const containerRef = useRef(null);

  /**
   * ========== Util hooks
   */
  const event$ = useObservable<IEvent>(eventInstance.current.onEvent());

  const controls = useAnimation();

  const { windowWidth } = useWindowSize();

  // const endPosition = useMemo(() => {
  //   if (!mapInstance || !coordinates) {
  //     return;
  //   }
  //   return mapInstance?.project(coordinates);
  // }, [
  //   activeEvent,
  // ]);

  const bbox = activeEvent?.markerNode
    ? activeEvent.markerNode.getBoundingClientRect()
    : undefined;

  // const endPosition = activeEvent?.coordinates
  //   ? mapInstance?.project(getLngLatTuple(activeEvent.coordinates))
  //   : undefined;

  // const startPosition = startNode
  //   ? getPositionFromTarget(startNode)
  //   : undefined;

  /**
   * Effects
   */


  /**
   * Framer variants
   */
  const variants = {
    closed: {
      borderRadius: "50%",
      width: 10,
      height: 10,
      x: bbox?.x,
      y: bbox?.y,
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

      eventInstance.current.createEvent(eventContent);
    }
    else {
      const eventContent = {
        content: content ?? contentFromProps,
        title: title ?? titleFromProps,
        address: address ?? addressFromProps,
        time: time ?? timeFromProps,
      };
      eventInstance.current.updateEvent(eventId, eventContent);
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

    <motion.div
      onClick={() => setIsEventOpen(false)}
      variants={variants}
      initial="closed"
      animate={isEventOpen ? "open" : "closed"}
      className={styles.event}
      ref={containerRef}
      exit="closed"
    >
      test
    </motion.div>
    // <AnimatePresence>
    //   {isEventOpen &&
    //   <motion.div
    //     variants={getVariants()}
    //     initial="closed"
    //     animate={isEventOpen ? "open" : "closed"}
    //     className={styles.event}
    //     ref={containerRef}
    //     exit="closed"
    //   >
    //     {/*<EventTitle address={address}/>*/}
    //
    //     <IosClose
    //       onClick={() => setIsEventOpen(false)}
    //       className={styles.closeBtn}
    //       fontSize="40"
    //     />
    //
    //     <div className={styles.titleInput}>
    //       <input
    //         value={!!title ? title : titleFromProps}
    //         onChange={handleTitle}
    //       />
    //     </div>
    //
    //     <div className={styles.addressInput}>
    //       <IosMapOutline/>
    //       <input
    //         value={!!address ? address : addressFromProps}
    //         onChange={handleLocation}
    //       />
    //     </div>
    //
    //     <div className={styles.dateInput}>
    //       <IosCalendarOutline/>
    //       <input
    //         value={!!time ? time : timeFromProps}
    //         onChange={handleDate}
    //       />
    //     </div>
    //
    //     <div className={styles.contentInput}>
    //     <textarea
    //       value={!!content ? content : contentFromProps}
    //       onChange={handleContent}
    //     />
    //     </div>
    //
    //     <Button
    //       className={styles.saveBtn}
    //       onClick={handleSave}
    //     >
    //       Save
    //     </Button>
    //   </motion.div>
    //   }
    // </AnimatePresence>
  );
};

export { EventModal };
