import { TCoords, TLngLat } from "@common/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";

export const SeattleCoordinates: TCoords = [-122.335167, 47.608013];
export const SeattleLngLat: TLngLat = {
  lng: -122.335167,
  lat: 47.608013,
};

export const MapInitialState: MapStateType = {
  mapCenterCoords: SeattleCoordinates,
  mapInstance: undefined,
  mapRef: undefined,
  mapZoom: 15,
  mapZoomActive: false,
  mapMoveActive: false,
};

export const MAP_CENTER_COORDS = "MAP_CENTER_COORDS";
export const MAP_INSTANCE = "MAP_INSTANCE";
export const MAP_REF = "MAP_REF";
export const MAP_ZOOM = "MAP_ZOOM";

export const MAP_ZOOM_ACTIVE = "MAP_ZOOM_ACTIVE";
export const MAP_MOVE_ACTIVE = "MAP_MOVE_ACTIVE";

export const MAP_EASE_TO = "MAP_EASE_TO";
export const MAP_FLY_TO = "MAP_FLY_TO";

export const MAP_CENTER_ON_CLIENT = "MAP_CENTER_ON_CLIENT";
export const MAP_CENTER_ON_ADDRESS = "MAP_CENTER_ON_ADDRESS";
export const MAP_CENTER_ON_COORDS = "MAP_CENTER_ON_COORDS";
