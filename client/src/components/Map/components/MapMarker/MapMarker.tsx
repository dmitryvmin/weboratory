// Libs
import React, { MouseEvent, useRef, FC, useEffect } from "react";
import { Marker } from "react-mapbox-gl";
import { motion, useAnimation } from "framer-motion";

// Styles
import styles from "@components/Map/components/MapMarker/styles.module.scss";

// Components
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { TMapMarkerProps } from "@components/Map/components/MapMarker/types";

// Store
import { getPositionFromTarget } from "@components/Events/utils/getPositionFromTarget";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

// Utils
import { checkIsMarkerHovered } from "@components/Map/components/MapMarker/utils";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";

const transitionMarkerIn = {
  ease: "easeInOut",
  duration: 0.3,
};

const transitionMarkerBounce = {
  yoyo: Infinity,
  ease: "easeInOut",
  duration: 1,
};

/**
 * MapMarker
 */
const MapMarker: FC<TMapMarkerProps> = ({ event }) => {

  /**
   * Store Hooks
   */
  const {
    event: eventFromStore,
    isEventModalOpen,
    setEventModal,
    openEventFromMarker,
  } = useEventStore();

  const { hoveredSegment } = useCalendarStore();

  const { setMapMarkerRef } = useMapStore();

  /**
   * Component Hooks
   */
  const titleRef = useRef<HTMLDivElement>(null);

  const POIRef = useRef<HTMLDivElement>(null);

  /**
   * Lib Hooks
   */
  const POIControls = useAnimation();

  const TitleControls = useAnimation();

  /**
   * Vars
   */
  const {
    address,
    coordinates,
    title,
    color,
    time,
  } = event;

  if (!coordinates) {
    return null;
  }

  const markerCoordsTuple = getLngLatTuple(coordinates);

  const titleBBox = getPositionFromTarget(titleRef.current);

  const isMarkerHovered = checkIsMarkerHovered(time, hoveredSegment);

  const POIVariants = {
    default: {
      x: -5,
      y: -5,
      width: 30,
      height: 30,
      rotate: 45,
    },
    hovered: {
      x: -5,
      y: -15,
      width: 40,
      height: 40,
      rotate: 45,
      transition: transitionMarkerIn,
    },
    bounce: {
      y: -10,
      transition: transitionMarkerBounce,
    },
  };

  const TitleVariants = {
    default: {
      x: titleBBox?.width ? -titleBBox.width / 2 + 10 : 0,
      y: -40,
    },
    hovered: {
      x: titleBBox?.width ? -titleBBox.width / 2 + 15 : 0,
      y: -50,
      transition: transitionMarkerIn,
    },
    bounce: {
      x: titleBBox?.width ? -titleBBox.width / 2 + 15 : 0,
      y: -45,
      transition: transitionMarkerBounce,
    },
  };

  /**
   * Effects
   */
  // useEffect(() => {
  //   if (
  //     !openFromCalMarker ||
  //     !POIRef.current ||
  //     !eventFromStore ||
  //     eventFromStore.eventId !== event.eventId
  //   ) {
  //     return;
  //   }
  //   setOpenEventFromMapMarker(event, { markerNode: POIRef.current });
  // }, [
  //   eventFromStore,
  // ]);

  useEffect(() => {
    if (
      isMarkerHovered ||
      (eventFromStore?.eventId === event.eventId && isEventModalOpen)
    ) {
      startOnHoverAnimation();
    }
    else {
      endOnHoverAnimation();
    }
  }, [
    isMarkerHovered,
    eventFromStore,
    titleBBox,
  ]);

  useEffect(() => {
    if (!POIRef.current) {
      return;
    }
    setMapMarkerRef({
      eventId: event.eventId,
      markerNode: POIRef.current,
    });
  }, [
    POIRef.current,
  ])

  /**
   * Utils
   */
  async function startOnHoverAnimation() {
    await Promise.all([POIControls.start(POIVariants.hovered), TitleControls.start(TitleVariants.hovered)]);
    await Promise.all([POIControls.start(POIVariants.bounce), TitleControls.start(TitleVariants.bounce)]);
  }

  function endOnHoverAnimation() {
    POIControls.start(POIVariants.default);
    TitleControls.start(TitleVariants.default);
  }

  /**
   * Handlers
   */
  function handleMarker(ev: MouseEvent<HTMLDivElement>) {
    // Persist event so the marker can be tied to its event
    ev.persist();
    openEventFromMarker(event, { markerNode: ev.target as HTMLDivElement });
  }

  function handleMouseEnter() {
    startOnHoverAnimation();
  }

  function handleMouseLeave() {
    endOnHoverAnimation();
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
          animate={TitleControls}
          className={styles.title}
          custom={titleBBox}
        >
          {title}
        </motion.div>
        }
        <motion.div
          ref={POIRef}
          style={{ backgroundColor: color }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={POIControls}
          className={styles.poi}
          onClick={handleMarker}
        >
        </motion.div>
        {isMarkerHovered && <div className={styles.pulse}/>}
      </>
    </Marker>
  );
};

export { MapMarker };
