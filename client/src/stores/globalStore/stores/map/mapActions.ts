import {
  MAP_CENTER_COORDS, MAP_CENTER_ON_ADDRESS, MAP_CENTER_ON_CLIENT, MAP_CENTER_ON_COORDS, MAP_FLY_TO,
  MAP_INSTANCE, MAP_MOVE_ACTIVE,
  MAP_REF, MAP_ZOOM,
  MAP_ZOOM_ACTIVE,
} from "@stores/globalStore/stores/map/mapConstants";
import { TLngLat } from "@common/types";
import { MapMoveOptionsType, MapZoomType } from "@stores/globalStore/stores/map/types";

function setMapInstance(mapInstance) {
  return {
    type: MAP_INSTANCE,
    mapInstance,
  };
}

function setMapRef(mapRef) {
  return {
    type: MAP_REF,
    mapRef,
  };
}

function setMapZoom(mapZoom) {
  return {
    type: MAP_ZOOM,
    mapZoom,
  };
}

function setMapCenterCoords(mapCenterCoords) {
  return {
    type: MAP_CENTER_COORDS,
    mapCenterCoords,
  };
}

function setMapZoomActive(mapZoomActive: boolean) {
  return {
    type: MAP_ZOOM_ACTIVE,
    mapZoomActive,
  };
}

function setMapMoveActive(mapMoveActive: boolean) {
  return {
    type: MAP_MOVE_ACTIVE,
    mapMoveActive,
  };
}

function centerMapOnClient(mapMoveOptions: MapMoveOptionsType) {
  return {
    type: MAP_CENTER_ON_CLIENT,
    mapMoveOptions,
  };
}

function centerMapOnAddress(address: string) {
  return {
    type: MAP_CENTER_ON_ADDRESS,
    address,
  };
}

export {
  setMapInstance,
  setMapRef,
  setMapZoom,
  setMapCenterCoords,
  setMapZoomActive,
  setMapMoveActive,
  centerMapOnClient,
  centerMapOnAddress,
};
