import { TCoords, TLngLat } from "@common/types";
import { AnimationOptions, EaseToOptions, FlyToOptions, Map, PaddingOptions } from "mapbox-gl";

export type MapStateType = {
  mapCenterCoords: TCoords;
  mapInstance: Map | undefined;
  mapRef: MapRef;
  mapZoom: number;
  mapPadding?: PaddingOptions;
  mapZoomActive: boolean;
  mapMoveActive: boolean;
  animationOptions: Partial<AnimationOptions>;
  flyToOptions?: FlyToOptions;
}

// CameraOptions, AnimationOptions
export type MapMoveOptionsType = {
  mapInstance: Map;
  coords?: TLngLat;
};

export type MapEaseToOptionsType = EaseToOptions & MapMoveOptionsType & {padding?: Partial<PaddingOptions>};
export type MapFlyToOptionsType = FlyToOptions & MapMoveOptionsType & {padding?: Partial<PaddingOptions>};

type MapRef = HTMLElement | null;
