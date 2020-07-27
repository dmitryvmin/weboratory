// Libs
import React, { FC, useRef, useState, useEffect, memo, useMemo } from "react";
import ReactMapboxGl from "react-mapbox-gl";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../styles.module.scss";

// Map
import { TMapProps } from "@components/Events/Map/types";
import { useMap } from "@components/Events/Map/store";
import { TCoords } from "@components/Events/types";
import { haveCoordsChanged } from "@components/Events/utils/haveCoordsChanged";
import { log } from "@utils/Logger";

const Mapbox = ReactMapboxGl({
  accessToken: (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? process.env.MAPBOX_ACCESS_TOKEN) as string,
});

/**
 * Map
 */
const Map: FC<TMapProps> = ({ children }) => {

  /**
   * Hooks
   */
  const [mapCenterRef, setMapCenterRef] = useState<TCoords>();
  const [mapContentRef, setMapContentRef] = useState<any>();

  const mapRef = useRef<any>(null);

  const {
    setMapInstance,
    setMapRef,
    mapCenter,
  } = useMap();

  /**
   * Effects
   */
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    setMapRef(mapRef.current);
  }, [
    mapRef.current,
  ]);

  useEffect(() => {
    const haveChanged = haveCoordsChanged(mapCenter, mapCenterRef);
    if (!haveChanged) {
      return;
    }
    setMapCenterRef(mapCenter);
  }, [
    mapCenter,
  ]);

  useEffect(() => {
    if (!mapContentRef) {
      setMapContentRef(children);
      return;
    }
    let haveChanged = false;
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] !== typeof mapContentRef[i]) {
        haveChanged = true;
        break;
      }
    }
    if (!haveChanged) {
      return;
    }
    setMapContentRef(children);
  }, [
    children,
  ]);

  /**
   * Return JSX
   */
  return useMemo(() => (
    <Mapbox
      ref={mapRef}
      center={mapCenter}
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
  ), [
    mapCenterRef,
    mapContentRef,
  ]);
};

export { Map };
