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

console.log("@@ ================", process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, process.env.MAPBOX_ACCESS_TOKEN, process.env);

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

  const coordsChanged = haveCoordsChanged(mapCenter, mapCenterRef);

  const contentChanged = () => {
    let haveChanged = false;
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] !== typeof mapContentRef[i]) {
        haveChanged = true;
        break;
      }
    }
    return haveChanged;
  }

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
    if (!coordsChanged) {
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

    if (!contentChanged()) {
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
      zoom={[15]}
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
