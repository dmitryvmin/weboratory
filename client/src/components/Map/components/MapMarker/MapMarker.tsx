// Libs
import React, { MouseEvent, useRef, FC } from "react";
import { Marker } from "react-mapbox-gl";
import invariant from "invariant";

// Styles
import styles from "@components/Map/components/MapMarker/styles.module.scss";

// Components
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { TMapMarkerProps } from "@components/Map/components/MapMarker/types";

// Store
import { useEvents } from "@stores/EventStore";

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
  const { setEvent } = useEvents();

  /**
   * Vars
   */
  const {
    address,
    coordinates,
    title,
  } = event;

  if (!coordinates) {
    return null;
  }

  const markerCoordsTuple = getLngLatTuple(coordinates);

  /**
   * Handlers
   */
  function handleMarker(ev: MouseEvent<HTMLDivElement>) {
    // Persist event so the marker can be tied to its event
    ev.persist();

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
        <div
          ref={titleRef}
          className={styles.title}
        >
          {title}
        </div>
        }
        <div
          className={styles.poi}
          onClick={handleMarker}
        />
        <div className={styles.pulse}/>
      </>
    </Marker>
  );
};

export { MapMarker };
