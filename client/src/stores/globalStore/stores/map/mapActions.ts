// Constants
import {
  MAP_ANIMATION_OPTIONS,
  MAP_CENTER_COORDS,
  MAP_CENTER_ON_ADDRESS,
  MAP_CENTER_ON_CLIENT,
  MAP_FLY_TO,
  MAP_INSTANCE,
  MAP_MOVE_ACTIVE,
  MAP_PADDING,
  MAP_REF, MAP_ZOOM,
  MAP_ZOOM_ACTIVE,
} from "@stores/globalStore/stores/map/mapConstants";

// Types
import { MapMoveOptionsType } from "@stores/globalStore/stores/map/types";

export function setMapInstance(mapInstance) {
  return {
    type: MAP_INSTANCE,
    mapInstance,
  };
}

export function setMapFlyToOptions(flyToOptions) {
  return {
    type: MAP_FLY_TO,
    flyToOptions,
  };
}

export function setMapPadding(mapPadding) {
  return {
    type: MAP_PADDING,
    mapPadding,
  };
}

export function setMapRef(mapRef) {
  return {
    type: MAP_REF,
    mapRef,
  };
}

export function setMapZoom(mapZoom) {
  return {
    type: MAP_ZOOM,
    mapZoom,
  };
}

export function setMapAnimation(animationOption) {
  return {
    type: MAP_ANIMATION_OPTIONS,
    animationOption,
  };
}

export function setMapCenter(mapCenterCoords) {
  return {
    type: MAP_CENTER_COORDS,
    mapCenterCoords,
  };
}

export function setMapZoomActive(mapZoomActive: boolean) {
  return {
    type: MAP_ZOOM_ACTIVE,
    mapZoomActive,
  };
}

export function setMapMoveActive(mapMoveActive: boolean) {
  return {
    type: MAP_MOVE_ACTIVE,
    mapMoveActive,
  };
}

export function centerMapOnClient(mapMoveOptions: MapMoveOptionsType) {
  return {
    type: MAP_CENTER_ON_CLIENT,
    mapMoveOptions,
  };
}

export function centerMapOnAddress(address: string) {
  return {
    type: MAP_CENTER_ON_ADDRESS,
    address,
  };
}
