// Libs
import React, { MouseEvent, useRef, FC } from "react";
import { Marker } from "react-mapbox-gl";
import { motion } from "framer-motion";

// Styles
import styles from "@components/Map/components/MapMarker/styles.module.scss";

// Components
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { TMapMarkerProps } from "@components/Map/components/MapMarker/types";

// Store
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";

/**
 * MapMarker
 */
const MapMarker: FC<TMapMarkerProps> = ({ event }) => {

  /**
   * Hooks
   */
  const titleRef = useRef<HTMLDivElement>(null);

  const {
    setEvent,
    setEventModal,
    setEventModalOpen,
  } = useEventStore();

  /**
   * Vars
   */
  const {
    address,
    coordinates,
    title,
    color,
  } = event;

  if (!coordinates) {
    return null;
  }

  const markerCoordsTuple = getLngLatTuple(coordinates);

  const titleBBox = getPositionFromTarget(titleRef.current);

  /**
   * Handlers
   */
  function handleMarker(ev: MouseEvent<HTMLDivElement>) {
    // Persist event so the marker can be tied to its event
    ev.persist();

    // closeSearch();

    setEvent(event);
    setEventModal({ markerNode: ev.target as HTMLDivElement});
    setEventModalOpen();

  }

  /**
   * Return JSX
   */
  return (
    <Marker
      coordinates={markerCoordsTuple}
      anchor="bottom"
    >
      <>
        {title &&
        <motion.div
          ref={titleRef}
          className={styles.title}
          style={{
            x: titleBBox?.width ? -titleBBox.width / 2 : 0,
            y: -40,
          }}
        >
          {title}
        </motion.div>
        }
        <div
          style={{ backgroundColor: color }}
          className={styles.poi}
          onClick={handleMarker}
        />
        <div className={styles.pulse}/>
      </>
    </Marker>
  );
};

export { MapMarker };
