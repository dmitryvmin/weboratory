// Libs
import React, { FC, useRef, useEffect, useMemo, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../styles.module.scss";

// Map
import { TMapProps } from "@components/Events/Map/types";
import { useMap } from "@components/Events/Map/store";

/**
 * Map
 */
const Map: FC<TMapProps> = ({
  children,
  center,
}) => {

  /**
   * Hooks
   */
  const mapRef = useRef<any>(null);

  const Mapbox = useRef<any>(initMapbox()).current;

  const {
    setMapInstance,
    setMapRef,
    clientLocation,
  } = useMap();

  /**
   * Effects
   */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    setMapRef(mapRef.current);
  }, [mapRef.current]);

  /**
   * Utils
   */
  function initMapbox() {
    return ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!,
    });
  }

  /**
   * Return JSX
   */
  return useMemo(() => {
    return (
      <Mapbox
        ref={mapRef}
        center={clientLocation}
        zoom={[17]}
        pitch={[45]}
        bearing={[-45]}
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
  }, [
    center,
    children,
  ]);
};

export { Map };
