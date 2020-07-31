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

const ModalContent: any = ({
  activeEvent,
  eventsInstance,
}) => {

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
    <div className={styles.eventModal}>
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
    </div>
  );
};

export { ModalContent };
