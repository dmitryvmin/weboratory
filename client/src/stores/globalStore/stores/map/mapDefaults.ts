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
  mapRef: null,
  mapZoom: 15,
  mapZoomActive: false,
  mapMoveActive: false,
  animationOptions: {
    duration: 2000,
  },
};
