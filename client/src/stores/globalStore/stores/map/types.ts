import { TCoords, TLngLat } from "@common/types";
import { PaddingOptions } from "react-mapbox-gl/lib/map";

export type MapStateType = {
  mapCenterCoords: TCoords;
  mapInstance: undefined | MapInstance;
  mapRef: MapRef;
  mapZoom: MapZoomType;
  mapZoomActive: boolean;
  mapMoveActive: boolean;
}

// CameraOptions, AnimationOptions
export type MapMoveOptionsType = {
  coords?: TLngLat;
  padding?: Partial<PaddingOptions>;
  zoom?: MapZoomType;
  speed?: number;
} & { mapInstance: MapInstance };

type MapInstance = any;
type MapRef = any;
export type MapZoomType = number;