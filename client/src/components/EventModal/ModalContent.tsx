// Libs
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { motion, usePresence } from "framer-motion";

// Styles
import styles from "./styles.module.scss";

// Components
import { Button } from "@components/UI/Button";
import { Close, Calendar, Map, MapPin } from "@components/UI/Icon";

// Constants
import { SEARCH_MIN } from "@stores/EventStore";

// Store
import { eventsInstance } from "@components/Events/eventsInstance";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

const ModalContent: FC<any> = ({ centerModalOn }) => {

  /**
   * ========== Context hooks
   */
  const { setCalOpen } = useCalendarStore();

  const { centerMapOnAddress } = useMapStore();

  const [addressSearchOn, setAddressSearchTo] = useState<boolean>(true);

  const {
    event,
    updateEvent,
    setEventModalClosed,
  } = useEventStore();

  const [isPresent, safeToRemove] = usePresence();

  /**
   * ========== Effects
   */
  if (!isPresent && safeToRemove) {
    return null;
  }

  /**
   * Handlers
   */
  function handleSave() {
    const eventId = new URLSearchParams(window.location.search).get("eventId");
    if (!eventId || !event) {
      return;
    }
    if (eventId.startsWith("new")) {
      eventsInstance.createEvent(event);
    }
    else {
      eventsInstance.updateEvent(eventId, event);
    }
  }

  function handleTitle(ev: ChangeEvent<HTMLInputElement>) {
    updateEvent({ title: ev.target.value });
  }

  function handleLocation(ev: ChangeEvent<HTMLInputElement>) {
    const address = ev.target.value;
    updateEvent({ address });

    if (addressSearchOn && address.length > SEARCH_MIN) {
      centerMapOnAddress(address);
      centerModalOn("openOnMarker");
    }
  }

  function handleContent(ev: ChangeEvent<HTMLTextAreaElement>) {
    updateEvent({ content: ev.target.value });
  }

  function handleTime(ev: ChangeEvent<HTMLInputElement>) {
    updateEvent({ time: new Date(ev.target.value) });
  }

  const toggleAddressSearchTo = (isOn: boolean) => () => {
    setAddressSearchTo(isOn);
    centerModalOn(isOn ? "openOnBottom" : "openOnCenter");
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
    return (
      <>
        <div className={styles.titleInput}>
          <input
            value={event?.title ?? ""}
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
            value={event?.address ?? ""}
            onChange={handleLocation}
          />
        </div>

        <div className={styles.timeInput}>
          <Calendar
            onClick={setCalOpen}
            className={styles.timeBtn}
          />
          <input
            value={event?.time ? event.time.toString() : ""}
            onChange={handleTime}
          />
        </div>

        <div className={styles.contentInput}>
        <textarea
          value={event?.content ?? ""}
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
      animate="open"
      variants={contentVariants}
      className={styles.modalContent}
    >
      <Close
        onClick={setEventModalClosed}
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
