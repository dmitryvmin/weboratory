// Libs
import { useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TLngLat } from "@common/types";
import { getMapCenterCoords, getMapInstance, getMapRef, getMapZoom } from "@stores/globalStore/stores/map/mapSelectors";
import { MapZoomType } from "@stores/globalStore/stores/map/types";
import {
  centerMapOnAddress,
  setMapCenterCoords, setMapInstance,
  setMapRef,
  setMapZoom,
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

  const _centerMapOnAddress = useCallback(
    (address: string) => dispatch(centerMapOnAddress(address)),
    [dispatch],
  );

  const _setMapZoom = useCallback(
    (mapZoom: MapZoomType) => dispatch(setMapZoom(mapZoom)),
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
    setMapRef: _setMapRef,
    centerMapOnAddress: _centerMapOnAddress,
    setMapInstance: _setMapInstance,
  };
}