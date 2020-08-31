// Libs
import { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TLngLat } from "@common/types";
import {
  getAnimationOptions,
  getMapCenterCoords, getMapFlyToOptions,
  getMapInstance,
  getMapRef,
  getMapZoom,
} from "@stores/globalStore/stores/map/mapSelectors";
import {
  centerMapOnAddress,
  setMapInstance, setMapMoveActive,
  setMapRef,
  setMapZoom, setMapZoomActive,
} from "@stores/globalStore/stores/map/mapActions";

/**
 * Map store facade
 */
export function useMapStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  const mapCenterCoords = useSelector(getMapCenterCoords);
  const mapInstance = useSelector(getMapInstance);
  const mapRef = useSelector(getMapRef);
  const mapZoom = useSelector(getMapZoom);
  const animationOptions = useSelector(getAnimationOptions);
  const flyToOptions = useSelector(getMapFlyToOptions);

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

  const _setMapEaseTo = (coords, padding, zoom) => {

  }

  const _setMapFlyTo = (coords, padding, zoom) => {

  }

  return {
    mapCenterCoords,
    mapZoom,
    animationOptions,
    flyToOptions,
    setMapRef: _setMapRef,
    centerMapOnAddress: _centerMapOnAddress,
    setMapInstance: _setMapInstance,
    setMapMoveActive: _setMapMoveActive,
    setMapZoomActive: _setMapZoomActive,
  };
}