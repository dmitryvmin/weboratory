// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// App
import {
  getAnimationOptions, getIsMapMaxZoom, getIsMapMinZoom,
  getMapCenterCoords, getMapFlyToOptions,
  getMapInstance, getMapMarkerRefs,
  getMapRef,
  getMapZoom,
} from "@stores/globalStore/stores/map/mapSelectors";
import {
  centerMapOnAddress,
  setMapInstance, setMapMarkerRef, setMapMoveActive,
  setMapRef,
  setMapZoom, setMapZoomActive,
} from "@stores/globalStore/stores/map/mapActions";
import { MSMapMarkerRef } from "@stores/globalStore/stores/map/types";

/**
 * Map store facade
 */
export function useMapStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const mapCenterCoords = useSelector(getMapCenterCoords);

  const mapInstance = useSelector(getMapInstance);

  const mapRef = useSelector(getMapRef);

  const mapZoom = useSelector(getMapZoom);

  const animationOptions = useSelector(getAnimationOptions);

  const flyToOptions = useSelector(getMapFlyToOptions);

  const mapMarkerRefs = useSelector(getMapMarkerRefs);

  const isMapMaxZoom = useSelector(getIsMapMaxZoom);
  const isMapMinZoom = useSelector(getIsMapMinZoom);

  /**
   * Dispatchers
   */
  const _centerMapOnAddress = useCallback(
    (address: string) => dispatch(centerMapOnAddress(address)),
    [dispatch],
  );

  const _setMapZoom = useCallback(
    (mapZoom: number) => dispatch(setMapZoom(mapZoom)),
    [dispatch],
  );

  const _setMapMoveActive = useCallback(
    (mapMoveActive: boolean) => dispatch(setMapMoveActive(mapMoveActive)),
    [dispatch],
  );

  const _setMapZoomActive = useCallback(
    (mapZoomActive: boolean) => dispatch(setMapZoomActive(mapZoomActive)),
    [dispatch],
  );

  const _setMapRef = useCallback(
    (node) => dispatch(setMapRef(node)),
    [dispatch],
  );

  const _setMapInstance = useCallback(
    (mapInstance) => dispatch(setMapInstance(mapInstance)),
    [dispatch],
  );

  const _setMapMarkerRef = useCallback(
    (mapRef: MSMapMarkerRef) => dispatch(setMapMarkerRef(mapRef)),
    [dispatch],
  );

  const _setMapEaseTo = (coords, padding, zoom) => {

  };

  const _setMapFlyTo = (coords, padding, zoom) => {

  };

  const mapZoomIn = useCallback(
    () => {
      if (mapZoom === 0) {
        return;
      }

      return dispatch(setMapZoom(mapZoom + 1));
    },
    [
      dispatch,
      mapZoom,
    ],
  );

  const mapZoomOut = useCallback(
    () => {
      if (mapZoom === 22) {
        return;
      }
      return dispatch(setMapZoom(mapZoom - 1));
    },
    [
      dispatch,
      mapZoom,
    ],
  );

  return ({
    mapInstance,
    mapRef,
    mapCenterCoords,
    mapZoom,
    animationOptions,
    flyToOptions,
    mapMarkerRefs,
    mapZoomIn,
    mapZoomOut,
    isMapMaxZoom,
    isMapMinZoom,
    setMapRef: _setMapRef,
    setMapMarkerRef: _setMapMarkerRef,
    centerMapOnAddress: _centerMapOnAddress,
    setMapInstance: _setMapInstance,
    setMapMoveActive: _setMapMoveActive,
    setMapZoomActive: _setMapZoomActive,
  });
}