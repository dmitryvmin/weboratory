// Libs
import React, { MouseEvent, useRef, FC } from "react";
import { Marker } from "react-mapbox-gl";
import { motion } from "framer-motion";
import invariant from "invariant";

// Styles
import styles from "@components/Map/components/MapMarker/styles.module.scss";

// Components
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { TMapMarkerProps } from "@components/Map/components/MapMarker/types";

// Store
import { useEvents } from "@stores/EventStore";
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";

/**
 * MapMarker
 */
const MapMarker: FC<TMapMarkerProps> = ({ event }) => {

  /**
   * Hooks
   */

  /**
   * ========== Component hooks
   */
  const titleRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Context hooks
   */
  const { setEvent, closeSearch } = useEvents();

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

    closeSearch();

    // Set clicked marker as the new Active Event
    setEvent({
      ...event,
      markerNode: ev.target,
    }, true);
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
          style={{backgroundColor: color}}
          className={styles.poi}
          onClick={handleMarker}
        />
        <div className={styles.pulse}/>
      </>
    </Marker>
  );
};

export { MapMarker };
