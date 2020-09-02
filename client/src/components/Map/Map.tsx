// Libs
import React, { FC, memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./styles.module.scss";

// Types
import { MapPropsRefState } from "@components/Map/types";

// Constants
import { Mapbox } from "@components/Map/constants";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";
import { useEventsDataStore } from "@stores/globalStore/stores/eventsData/useEventsData";
import { MapMarker } from "@components/Map/components/MapMarker/MapMarker";

/**
 * Map
 */
const Map: FC<{}> = memo(() => {

  /**
   * Hooks
   */
  const {
    mapZoom,
    mapCenterCoords,
    setMapRef,
    setMapInstance,
    setMapMoveActive,
    setMapZoomActive,
    animationOptions,
    flyToOptions,
  } = useMapStore();

  const { eventsData } = useEventsDataStore();

  const [refState, setRefState] = useState<MapPropsRefState>();

  // Save Map ref for imperative map control
  const mapRef = useCallback(setMapRef, []);

  function _setMapInstance(instance) {

    setMapInstance(instance);

    instance.on("movestart", function() {
      setMapMoveActive(true);
    });

    instance.on("moveend", function() {
      setMapMoveActive(false);
    });

    instance.on("zoomstart", function() {
      setMapZoomActive(true);
    });

    instance.on("zoomend", function() {
      setMapZoomActive(false);
    });
  }

  // // Check whether map should re-render
  // useEffect(() => {
  //
  //   // Compare props
  //   const mapCenterCoordsChanged = haveMapCenterCoordsChanged(mapCenterCoords, refState?.mapCenterCoords);
  //   const mapZoomChanged = hasMapZoomChanged(mapZoom, refState?.mapZoom);
  //   const mapChildrenChanged = haveMapChildrenChanged(eventsData, refState?.children);
  //
  //   // If props haven't changed, skip render
  //   if (
  //     !mapCenterCoordsChanged &&
  //     !mapZoomChanged &&
  //     !mapChildrenChanged
  //   ) {
  //     return;
  //   }
  //
  //   // If props have changes, create a new object filling in props that changed
  //   const newRefState = {
  //     // ...refState,
  //     ...(mapCenterCoordsChanged && { mapCenterCoords }),
  //     ...(mapZoomChanged && { mapZoom }),
  //     ...(mapChildrenChanged && { children: eventsData }),
  //   };
  //
  //   setRefState(newRefState);
  //
  // }, [
  //   mapCenterCoords,
  //   mapZoom,
  //   eventsData,
  //   // mapRef,
  // ]);

  const renderQueriedMarkers = () => {
    // return events$
    //   // ?.filter((event) => event.event_id !== activeEvent?.event_id)
    //   ?.map((event, idx) => {
    //     return (
    //       <MapMarker
    //         key={`marker-${event.eventId}-${idx}`}
    //         event={event}
    //       />
    //     );
    //   });
    if (!eventsData) {
      return;
    }
    return eventsData?.map((event, idx) => {
      return (
        // <motion.div
        //   key={`marker-${event.eventId}`}
        //   initial={{opacity: 0}}
        //   animate={{opacity: 1}}
        //   exit={{opacity: 0}}
        // >
        <MapMarker
          key={`marker-${event.eventId}-${idx}`}
          event={event}
        />
        // </motion.div>
      );
    });
  };

  return (
    <Mapbox
      ref={mapRef}
      center={mapCenterCoords}
      zoom={[mapZoom]}
      pitch={[45]}
      style="mapbox://styles/dmitrym/ckekc3x0c07fd19nyc74d7nr1"
      // style="mapbox://styles/mapbox/streets-v8"
      className={styles.map}
      animationOptions={animationOptions}
      flyToOptions={flyToOptions}
      onStyleLoad={_setMapInstance}
    >
      {renderQueriedMarkers()}
    </Mapbox>
  );
  /**
   * Return memoized Mapbox component to avoid restarting flyTo
   * animation when context changes
   */
  // return useMemo(() => {
  //
  //   console.log("========================= mapZoom", mapZoom);
  //
  //   return (
  //     <Mapbox
  //       ref={mapRef}
  //       center={mapCenterCoords}
  //       zoom={[mapZoom]}
  //       pitch={[45]}
  //       style="mapbox://styles/mapbox/streets-v10"
  //       className={styles.map}
  //       animationOptions={animationOptions}
  //       onStyleLoad={_setMapInstance}
  //       flyToOption={flyToOption}
  //     >
  //       {renderQueriedMarkers()}
  //     </Mapbox>
  //   );
  // }, [
  //   refState,
  // ]);
});

export { Map };
