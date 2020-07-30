// Libs
import React, { MouseEvent, FC } from "react";
import { Marker } from "react-mapbox-gl";
import invariant from "invariant";

// Styles
import styles from "@components/Map/components/MapMarker/styles.module.scss";

// Components
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { TMapMarkerProps } from "@components/Map/components/MapMarker/types";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

/**
 * MapMarker
 */
const MapMarker: FC<TMapMarkerProps> = ({ event }) => {

  /**
   * Hooks
   */
  const {
    setIsSearchOpen,
    // setIsEventOpen,
    setSearchedAddress,
    setEvent,
  } = useEvents();

  // const {
  //   setMarker,
  //   easeTo,
  //   centerMapOnCoords,
  // } = useMap();

  /**
   * Vars
   */
  const {
    address,
    coordinates,
    title,
  } = event;

  const markerCoordsTuple = getLngLatTuple(coordinates);

  function handleMarker(ev: MouseEvent<HTMLDivElement>) {

    // Persist event
    ev.persist();

    // Set clicked marker as the new Active Event
    setEvent({ ...event, markerNode: ev.target }, true);

    // centerMapOnCoords(coordinates);
    // easeTo({
    //   coords: coordinates,
    //   padding: {
    //     bottom: 400,
    //   },
    // });

    // setIsEventOpen(true);
    // Set Marker
    // setMarker(event);

    // Open Modal
    // setIsEventOpen(true);
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
        <div className={styles.title}>{title}</div>
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
