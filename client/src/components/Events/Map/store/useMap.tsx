// Libs
import { useContext, useEffect } from "react";
import invariant from "invariant";

// Map store
import { IMapContext, IUseMap } from "@components/Events/Map/store/types";
import { MapContext } from "@components/Events/Map/store/MapContext";

// Event utils
import { getCurrentPosition } from "@components/Events/utils/getCurrentPosition";
import { TCoords, TLngLat } from "@components/Events/types";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";

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
  //     if (state.mapInstance) {
  //       state.mapInstance.remove();
  //     }
  //   };
  // }, []);

  // Start map loaded on client's location
  useEffect(() => {
    getCurrentPosition().then((coords) => {
      if (!coords) {
        invariant(coords, `Couldn't set mapCenter - client coordinates are falsy: ${coords}`);
        return;
      }
      setMapCenter(coords);
    });
  }, []);

  /**
   * State Utils
   */
  function setMapCenter(coords?: TLngLat) {

    if (!coords) {
      invariant(coords, `Couldn't set mapCenter - coordinates value is falsy: ${coords}`);
      return;
    }

    const mapCenter = getLngLatTuple(coords);

    if (!mapCenter) {
      invariant(mapCenter, `Couldn't set mapCenter - mapCenter value is falsy: ${mapCenter}`);
      return;
    }

    setState((s) => ({
      ...s,
      mapCenter,
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
    return state.mapCenter;
  }

  function getMapRef() {
    return state.mapRef;
  }

  /**
   * Return map state and public utilities
   */
  return {
    mapCenter: state.mapCenter,
    mapInstance: state.mapInstance,
    setMapInstance,
    setMapRef,
    setMapCenter,
  };
};

export { useMap };
