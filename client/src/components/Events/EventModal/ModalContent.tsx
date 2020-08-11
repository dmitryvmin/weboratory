// Libs
import React, { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
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
import { Close, Calendar, Map, MapPin } from "@components/UI/Icon";

// Services
import { eventsService } from "@api/services/eventsService";

// Utils
import { useObservable } from "@utils/hooks/useObservable";

// Types
import { IEvent } from "@common/types";
import { TEventModalProps } from "./types";

// Store
import { useMap } from "@stores/MapStore";
import { SEARCH_MIN, useEvents } from "@stores/EventStore";
import { eventsInstance } from "@components/Events/eventsInstance";

const ModalContent: any = ({ centerModalOn }) => {

  /**
   * ========== Context hooks
   */
  const {
    isEventOpen,
    closeEvent,
    activeEvent,
    updateActiveEvent,
  } = useEvents();

  const { centerMapOnAddress } = useMap();

  /**
   * ========== State hooks
   */
  const [addressSearchOn, setAddressSearchTo] = useState<boolean>(true);

  /**
   * Handlers
   */
  function handleSave() {
    const eventId = new URLSearchParams(window.location.search).get("eventId");
    if (!eventId || !activeEvent) {
      return;
    }
    if (eventId.startsWith("new")) {
      eventsInstance.createEvent(activeEvent);
    }
    else {
      eventsInstance.updateEvent(eventId, activeEvent);
    }
  }

  function handleTitle(ev: ChangeEvent<HTMLInputElement>) {
    updateActiveEvent({ title: ev.target.value });
  }

  function handleLocation(ev: ChangeEvent<HTMLInputElement>) {
    const address = ev.target.value;
    updateActiveEvent({ address });
    if (addressSearchOn) {
      centerMapOnAddress(address);
      if (address.length < SEARCH_MIN) {
        return;
      }
      centerModalOn("openOnMarker");
    }
  }

  function handleContent(ev: ChangeEvent<HTMLTextAreaElement>) {
    updateActiveEvent({ content: ev.target.value });
  }

  function handleTime(ev: ChangeEvent<HTMLInputElement>) {
    updateActiveEvent({ time: ev.target.value });
  }

  const toggleAddressSearchTo = (isOn: boolean) => () => {
    setAddressSearchTo(isOn);
    centerModalOn(isOn ? "openOnMarker" : "openOnCenter");
    if (isOn) {

    }
  };

  /**
   * Variants
   */
  const contentVariants = {
    closed: {
      scale: 0,
    },
    open: {
      scale: 1,
    },
  };

  /**
   * Render functions
   */
  const renderEventInputs = () => {
    if (!isEventOpen) {
      return;
    }
    return (
      <>
        <div className={styles.titleInput}>
          <input
            value={activeEvent?.title ?? ""}
            onChange={handleTitle}
          />
        </div>

        <div className={styles.addressInput}>
          {addressSearchOn
            ? (
              <Map
                className={styles.addressBtn}
                onClick={toggleAddressSearchTo(false)}
              />
            )
            : (
              <MapPin
                className={styles.addressBtn}
                onClick={toggleAddressSearchTo(true)}
              />
            )
          }
          <input
            value={activeEvent?.address ?? ""}
            onChange={handleLocation}
          />
        </div>

        <div className={styles.timeInput}>
          <Calendar className={styles.timeBtn}/>
          <input
            value={activeEvent?.time ?? ""}
            onChange={handleTime}
          />
        </div>

        <div className={styles.contentInput}>
        <textarea
          value={activeEvent?.content ?? ""}
          onChange={handleContent}
        />
        </div>
      </>
    );
  };

  /**
   * Return JSX
   */
  return (
    <motion.div
      initial="closed"
      variants={contentVariants}
      animate={isEventOpen ? "open" : "closed"}
      className={styles.modalContent}
    >
      <Close
        onClick={closeEvent}
        className={styles.closeBtn}
        fontSize="40"
      />
      {renderEventInputs()}
      <Button
        className={styles.saveBtn}
        onClick={handleSave}
      >
        Save
      </Button>
    </motion.div>
  );
};

export { ModalContent };
