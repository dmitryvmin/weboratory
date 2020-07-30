import { TCoords, TLngLat } from "@common/types";
import { IMapState } from "./types";

export const SeattleCoordinates: TCoords = [-122.335167, 47.608013];
export const SeattleLngLat: TLngLat = {
  lng: -122.335167,
  lat: 47.608013,
};

export const MapInitialState: IMapState = {
  mapCenterCoords: SeattleLngLat,
  mapInstance: undefined,
  mapRef: undefined,
  mapZoom: 15,
  activeMarker: undefined,
};
