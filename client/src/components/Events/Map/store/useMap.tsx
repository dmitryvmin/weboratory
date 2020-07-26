// Libs
import { useContext, useEffect } from "react";

// Map store
import { IMapContext, IUseMap } from "@components/Events/Map/store/types";
import { MapContext } from "@components/Events/Map/store/MapContext";

// Event utils
import { getCurrentPosition } from "@components/Events/utils/getCurrentPosition";

/**
 * Map context facade
 */
const useMap = (): IUseMap => {

  /**
   * Hooks
   */
  const [state, setState] = useContext<IMapContext>(MapContext);

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

  // Start map loaded on client's location
  useEffect(() => {
    getCurrentPosition().then((position) => {
      if (!position) {
        return;
      }
      // const lngLat = getLngLatArray(position);
      // if (!lngLat) {
      //   return;
      // }
      setClientLocation(position);
    });
  }, []);

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
   * Return map state and public utilities
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
