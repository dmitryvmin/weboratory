import * as MapboxGl from "mapbox-gl";
import { CSSProperties } from "react";
import { TLngLat } from "@common/types";
import { AnimationOptions, FlyToOptions, LngLatBoundsLike } from "mapbox-gl";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";

export interface MapPropsType {
  style: string | MapboxGl.Style;
  center?: [number, number];
  zoom?: [number];
  maxBounds?: LngLatBoundsLike;
  fitBounds?(
    bounds: LngLatBoundsLike,
    options?: mapboxgl.FitBoundsOptions,
    eventData?: mapboxgl.EventData,
  ): any;
  fitBoundsOptions?: FitBoundsOptions;
  bearing?: [number];
  pitch?: [number];
  containerStyle?: CSSProperties;
  className?: string;
  movingMethod?: "jumpTo" | "easeTo" | "flyTo";
  animationOptions?: Partial<AnimationOptions>;
  flyToOptions?: FlyToOptions;
  children?: JSX.Element | JSX.Element[] | Array<JSX.Element | undefined>;
  renderChildrenInPortal?: boolean;
}

export type MapPropsRefState = {
  children?: any;
  mapCenterCoords?: TLngLat;
  mapZoom?: number;
}
