import { TCoords, TLngLat } from "@common/types";
import { AnimationOptions, EaseToOptions, FlyToOptions, Map, PaddingOptions } from "mapbox-gl";

export type MSMapRef = HTMLElement | null;

export type MSMapMarkerRefs = (MSMapMarkerRef | undefined)[];

export type MSMapMarkerRef = {
  eventId: string;
  markerNode: HTMLElement | undefined;
};

export type MSAnimationOptions = Partial<AnimationOptions>;

export type MapStateType = {
  mapCenterCoords: TCoords;
  mapInstance: Map | undefined;
  mapRef: MSMapRef;
  mapZoom: number;
  mapPadding?: PaddingOptions;
  mapZoomActive: boolean;
  mapMoveActive: boolean;
  animationOptions: MSAnimationOptions;
  flyToOptions?: FlyToOptions;
  mapMarkerRefs: MSMapMarkerRefs;
}

// CameraOptions, AnimationOptions
export type MapMoveOptionsType = {
  mapInstance: Map;
  coords?: TLngLat;
};

export type MapEaseToOptionsType = EaseToOptions & MapMoveOptionsType & {padding?: Partial<PaddingOptions>};
export type MapFlyToOptionsType = FlyToOptions & MapMoveOptionsType & {padding?: Partial<PaddingOptions>};

