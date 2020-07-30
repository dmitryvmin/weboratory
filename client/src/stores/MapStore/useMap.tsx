// Libs
import { useContext } from "react";
import invariant from "invariant";
import { PaddingOptions } from "react-mapbox-gl/lib/map";

// Map store
import { IMapContext, IMapState, IUseMap } from "./types";
import { MapContext } from "./MapContext";

// Common types
import { TLngLat } from "@common/types";

// Event utils
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { getClientPosition } from "@components/Events/utils/getClientPosition";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";

/**
 * Map context facade
 */
const useMap = (): IUseMap => {

  /**
   * ==================== Hooks ====================
   */

  const [
    {
      mapCenterCoords,
      mapInstance,
      mapZoom,
      mapRef,
    },
    setState,
  ] = useContext<IMapContext>(MapContext);

  /**
   * ==================== State Setters ====================
   */

  function setMapCenterCoords(coords: TLngLat) {
    setState((s): IMapState => ({
      ...s,
      mapCenterCoords: coords,
    }));
  }

  function setMapInstance(instance) {
    setState((s: IMapState) => ({
      ...s,
      mapInstance: instance,
    }));
  }

  function setMapRef(ref) {
    setState((s): IMapState => ({
      ...s,
      mapRef: ref,
    }));
  }

  function setMapZoom(zoom) {
    setState((s): IMapState => ({
      ...s,
      mapZoom,
    }));
  }

  /**
   * ==================== Public functions ====================
   */

  function easeTo({
    coords,
    padding,
    zoom,
  }) {
    mapInstance.easeTo({
      ...coords && { center: getLngLatTuple(coords) },
      ...zoom && { zoom },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding,
      },
    });
  }

  // TODO: should accept mapbox CameraOptions and AnimationOptions
  function flyTo({
    coords,
    padding,
    zoom,
  }) {
    mapInstance.flyTo({
      ...coords && { center: getLngLatTuple(coords) },
      ...zoom && { zoom },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding,
      },
    });
  }

  const centerMapOnClient = async () => {
    const coords = await getClientPosition();
    if (!coords) {
      invariant(coords, `Couldn't set mapCenter - client coordinates are falsy: ${coords}`);
      return;
    }

    setMapCenterCoords(coords);
  };

  const centerMapOnAddress = async (address: string) => {

    const lngLat = await geocodeQuery(address);
    if (!lngLat) {
      return;
    }

    setMapCenterCoords(lngLat);
    // mapInstance.flyTo({
    //   center: getLngLatTuple(lngLat),
    //   speed: 1,
    //   curve: 1,
    // });
  };

  const centerMapOnCoords = (coords: TLngLat) => {
    setMapCenterCoords(coords);
  };

  /**
   * Return map state and public utilities
   */
  return ({
    mapCenterCoords,
    mapInstance,
    mapZoom,
    mapRef,
    setMapInstance,
    setMapRef,
    setMapCenterCoords,
    setMapZoom,
    centerMapOnClient,
    centerMapOnAddress,
    centerMapOnCoords,
    easeTo,
    flyTo,
  });
};

export { useMap };
