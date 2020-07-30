// Libs
import React, { FC, useRef, useState, useEffect, useMemo, useCallback } from "react";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../Events/styles.module.scss";

// Types
import { TMapProps, TMapRefState } from "@components/Map/types";

// Store
import { useMap } from "@stores/MapStore";

// Utils
import { haveMapChildrenChanged } from "@components/Map/utils/haveMapChildrenChanged";
import { haveMapCenterCoordsChanged } from "@components/Map/utils/haveMapCenterCoordsChanged";
import { hasMapZoomChanged } from "@components/Map/utils/hasMapZoomChanged";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { log } from "@utils/Logger";

// Constants
import { Mapbox } from "@components/Map/constants";
import { MapInitialState } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

/**
 * Map
 */
const Map: FC<TMapProps> = ({ children }) => {

  /**
   * Hooks
   */

  /**
   * ========== Context hooks
   */
  const {
    setMapInstance,
    setMapRef,
    mapCenterCoords,
    mapZoom,
  } = useMap();

  const {activeEvent} = useEvents();

  /**
   * ========== State hooks
   */
  const [refState, setRefState] = useState<TMapRefState>();

  // Save Map ref for imperative map control
  const mapRef = useRef<any>();

  //   useCallback((ReactMapboxGl: any) => {
  //   if (!ReactMapboxGl) {
  //     return;
  //   }
  //   setMapRef(ReactMapboxGl);
  // }, []);

  /**
   * Effects
   */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    setMapRef(mapRef.current);
  }, [mapRef.current]);

  // Mimicking shouldComponentUpdate behavior to determine
  // whether map component should re-render
  // useEffect(() => {
  //
  //   // Compare props
  //   const mapCenterCoordsChanged = haveMapCenterCoordsChanged(mapCenterCoords, refState?.mapCenterCoords);
  //   const mapZoomChanged = hasMapZoomChanged(mapZoom, refState?.mapZoom);
  //   const mapChildrenChanged = haveMapChildrenChanged(children, refState?.children);
  //
  //   // If props haven't changed, skip render
  //   if (
  //     !mapCenterCoordsChanged &&
  //     !mapZoomChanged &&
  //     !mapChildrenChanged
  //   ) {
  //     // log("$$ MAP props have not changed: ", mapCenterCoordsChanged, mapZoomChanged, mapChildrenChanged);
  //     return;
  //   }
  //
  //   // If props have changes, create a new object filling in props that changed
  //   const newRefState = {
  //     ...refState,
  //     ...(mapCenterCoordsChanged && { mapCenterCoords }),
  //     ...(mapZoomChanged && { mapZoom }),
  //     ...(mapChildrenChanged && { children }),
  //   };
  //
  //   // log("$$ MAP props changed. new refState: ", mapCenterCoordsChanged, mapZoomChanged, mapChildrenChanged, newRefState);
  //   setRefState(newRefState);
  //
  // }, [
  //   mapCenterCoords,
  //   mapZoom,
  //   children,
  //   mapRef,
  // ]);

  // const center = activeEvent?.coordinates
  //   ? getLngLatTuple(activeEvent.coordinates)
  //   : getLngLatTuple(mapCenterCoords);

  const center = useMemo(() => getLngLatTuple(mapCenterCoords), []);

  return (
    <Mapbox
      ref={mapRef}
      center={center}
      zoom={[mapZoom]}
      pitch={[45]}
      style="mapbox://styles/mapbox/streets-v11"
      className={styles.map}
      animationOptions={{
        duration: 2000,
      }}
      onStyleLoad={setMapInstance}
    >
      {children}
    </Mapbox>
  )

  // /**
  //  * Return memoized Mapbox component to avoid restarting flyTo
  //  * animation when context changes
  //  */
  // return useMemo(() => {
  //
  //   // log("refState", refState, Date.now());
  //
  //   return (
  //     <Mapbox
  //       ref={mapRef}
  //       center={refState?.mapCenterCoords
  //         ? getLngLatTuple(refState.mapCenterCoords)
  //         : getLngLatTuple(MapInitialState.mapCenterCoords)
  //       }
  //       zoom={[refState?.mapZoom ?? MapInitialState.mapZoom]}
  //       pitch={[45]}
  //       style="mapbox://styles/mapbox/streets-v11"
  //       className={styles.map}
  //       animationOptions={{
  //         duration: 3000,
  //       }}
  //       onStyleLoad={setMapInstance}
  //     >
  //       {refState?.children}
  //     </Mapbox>
  //   );
  // }, [
  //   mapRef,
  //   refState,
  // ]);
};

export { Map };
