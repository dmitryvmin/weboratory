// Libs
import React, { FC, useRef, useEffect, useContext, useMemo } from "react";
import ReactMapboxGl from "react-mapbox-gl";

// Styles
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "../styles.module.scss";

// Map
import { MapContext } from "@components/Events/Map/store/MapContext";
import { TMapProps } from "@components/Events/Map/types";
import { getLngLatArray } from "@components/Events/utils/getLngLatArray";
import { SeattleCoordinates } from "@components/Events/Map/store/constants";

// Constants
const Mapbox = ReactMapboxGl({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
});

/**
 * Map
 */
export const Map: FC<TMapProps> = ({
  children,
  center,
}) => {

  /**
   * Hooks
   */
  const mapRef = useRef<any>(null);

  const {
    setMapInstance,
    setMapRef,
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

  return useMemo(() => (
    <Mapbox
      ref={mapRef}
      center={getLngLatArray(center) ?? SeattleCoordinates}
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
    center,
    children,
  ]);
};

const useMap = () => {

  /**
   * Hooks
   */
  const [state, setState] = useContext(MapContext);

  /**
   * Effects
   */
  // On component unmount, remove mapbox instance
  // useEffect(() => {
  //   return () => {
  //     // if (mapInstance) {
  //     //   mapInstance.remove();
  //     // }
  //   };
  // }, []);

  /**
   * State Utils
   */
  function setClientLocation(location) {
    setState((s) => ({
      ...s,
      clientLocation: location,
    }));
  }

  function setMapInstance(instance) {
    setState((s) => ({
      ...s,
      mapInstance: instance,
    }));
  }

  function setMapRef(ref) {
    setState((s) => ({
      ...s,
      mapRef: ref,
    }));
  }

  function getMapInstance() {
    return state.mapInstance;
  }

  function getClientLocation() {
    return state.clientLocation;
  }

  function getMapRef() {
    return state.mapRef;
  }

  /**
   * Hook "methods"
   */
  return {
    clientLocation: state.clientLocation,
    // setClientLocation,
    // getClientLocation,
    mapInstance: state.mapInstance,
    setMapInstance,
    // getMapInstance,
    setMapRef,
    // getMapRef,
  };
};

export { useMap };