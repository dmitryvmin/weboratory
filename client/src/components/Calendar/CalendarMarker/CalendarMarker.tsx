// Libs
import React, { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Rnd } from "react-rnd";

// Store
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";

// Styles
import classNames from "./styles.module.scss";

// Types
import { DotProps } from "./types";
import { IEvent } from "@common/types";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";
import { MSMapMarkerRef } from "@stores/globalStore/stores/map/types";

/**
 * Event Dot Calendar Marker
 */
const CalendarMarker: FC<DotProps> = ({ event }) => {

  /**
   * =============== Hooks ===============
   */
  const { openEventFromMarker } = useEventStore();
  const { mapMarkerRefs } = useMapStore();

  const dotRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  /**
   * Handlers
   */
  function handleCalendarEventMarker() {
    if (!mapMarkerRefs || !mapMarkerRefs.length) {
      return;
    }
    const { markerNode } = mapMarkerRefs.find((markerRef: MSMapMarkerRef) => markerRef.eventId === event.eventId);
    if (!markerNode) {
      return;
    }
    openEventFromMarker(event as IEvent, { markerNode });
  }

  /**
   * Effects
   */
  useEffect(() => {
    if (dotRef === null) {
      return;
    }
  }, [
    dotRef,
  ]);

  /**
   * =============== JSX ===============
   */

  /**
   * Render Component
   */
  return (
    <motion.div
      ref={dotRef}
      className={classNames.EventCalendarMarker}
    >
      {/*<Rnd*/}
      {/*  default={{*/}
      {/*    x: 0,*/}
      {/*    y: 0,*/}
      {/*    width: 20,*/}
      {/*    height: 20,*/}
      {/*  }}*/}
      {/*  className={classNames.eventDot}*/}
      {/*  style={{*/}
      {/*    backgroundColor: event.color,*/}
      {/*  }}*/}
      {/*/>*/}
      <div
        onClick={handleCalendarEventMarker}
        className={classNames.EventDot}
        style={{
          backgroundColor: event.color,
        }}
      >
        {/*<div className={classNames.eventTitle}>*/}
        {/*  Title*/}
        {/*</div>*/}
      </div>
    </motion.div>
  );
};

export { CalendarMarker };
