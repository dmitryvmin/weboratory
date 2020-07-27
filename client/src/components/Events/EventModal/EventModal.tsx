// Libs
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import IosClose from "react-ionicons/lib/IosClose";
import IosMapOutline from "react-ionicons/lib/IosMapOutline";
import IosCalendarOutline from "react-ionicons/lib/IosCalendarOutline";
import { useParams } from "react-router-dom";

// Styles
import styles from "./styles.module.scss";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Components
import { Button } from "@components/UI/Button";

// Types
import { TEventModal } from "../types";
import { eventsService } from "@api/services/eventsService";
import { useObservable } from "@utils/hooks/useObservable";
import { IEvent } from "@common/types";
import { useMap } from "@components/Events/Map/store";

/**
 * Event modal
 */
const EventModal: FC<TEventModal> = ({
  setEventOpen,
  startPosition,
  startFromSearch,
  coordinates,
  title: titleFromProps,
  location: locationFromProps,
  content: contentFromProps,
  time: timeFromProps,
}) => {

  /**
   * Hooks
   */
  const [location, setLocation] = useState<string | null>(null);

  const [title, setTitle] = useState<string | null>(null);

  const [content, setContent] = useState<string | null>(null);

  const [time, setTime] = useState<string | null>(null);

  const [initOpen, setInitOpen] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const eventInstance = useRef(new eventsService());

  const event$ = useObservable<IEvent>(eventInstance.current.onEvent());

  const { mapInstance, setMapCenter, mapCenter } = useMap();

  const containerRef = useRef(null);

  const { windowWidth } = useWindowSize();

  // const params = useParams();

  const endPosition = mapInstance.project(coordinates);

  /**
   * Effects
   */
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

  /**
   * Framer variants
   */
  const eventVariant = {
    closed: {
      borderRadius: (startFromSearch && initOpen) ? "0%" : "50%",
      width: (startFromSearch && initOpen) ? 300 : 7,
      height: (startFromSearch && initOpen) ? 27 : 7,
      x: initOpen ? startPosition.x : endPosition.x - 8,
      y: initOpen ? startPosition.y : endPosition.y - 20,
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

  // const buttonVariants = {
  //   closed: {
  //     transitionEnd: {
  //       display: "none",
  //     },
  //   },
  //   open: {
  //     display: "block",
  //   },
  // };

  /**
   * Handlers
   */
  function handleSave() {
    const eventContent = {
      content: content ?? contentFromProps,
      title: title ?? titleFromProps,
      location: location ?? locationFromProps,
      time: time ?? titleFromProps,
    };
    const eventId = new URLSearchParams(window.location.search).get("eventId");
    if (!eventId || !eventContent) {
      return;
    }
    eventInstance.current.updateEvent(eventId, eventContent);
  }

  function handleTitle(ev: ChangeEvent<HTMLInputElement>) {
    setTitle(ev.target.value);
  }

  function handleLocation(ev: ChangeEvent<HTMLInputElement>) {
    setLocation(ev.target.value);
  }

  function handleContent(ev: ChangeEvent<HTMLTextAreaElement>) {
    setContent(ev.target.value);
  }

  function handleDate(ev: ChangeEvent<HTMLInputElement>) {
    setTime(ev.target.value);
  }

  return (
    <motion.div
      variants={eventVariant}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className={styles.event}
      ref={containerRef}
      exit="closed"
    >
      {/*<motion.button*/}
      {/*  animate={isOpen ? "open" : "closed"}*/}
      {/*  variants={buttonVariants}*/}
      {/*  onClick={() => setIsOpen(false)}*/}
      {/*>*/}
      {/*  Close*/}
      {/*</motion.button>*/}
      {/*<EventTitle address={address}/>*/}

      <IosClose
        onClick={() => setIsOpen(false)}
        className={styles.closeBtn}
        fontSize="40"
      />

      <div className={styles.titleInput}>
        <input
          value={title ?? titleFromProps}
          onChange={handleTitle}
        />
      </div>

      <div className={styles.locationInput}>
        <IosMapOutline/>
        <input
          value={location ?? locationFromProps}
          onChange={handleLocation}
        />
      </div>

      <div className={styles.dateInput}>
        <IosCalendarOutline/>
        <input
          value={time ?? timeFromProps}
          onChange={handleDate}
        />
      </div>

      <div className={styles.contentInput}>
        <textarea
          value={content ?? contentFromProps}
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
  );
};

export { EventModal };
