// Libs
import React, { FC, useCallback } from "react";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./styles.module.scss";

// Types
import { TMapProps } from "@components/Map/types";

// Constants
import { Mapbox } from "@components/Map/constants";
import { useMapStore } from "@stores/globalStore/stores/map/useMapStore";

/**
 * Map
 */
const Map: FC<TMapProps> = ({ children }) => {

  /**
   * Hooks
   */
  const {
    mapZoom,
    mapCenterCoords,
    setMapRef,
    setMapInstance,
  } = useMapStore();

  // Save Map ref for imperative map control
  const mapRef = useCallback(setMapRef, []);

  return (
    <Mapbox
      ref={mapRef}
      center={mapCenterCoords}
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
  );
};

export { Map };
