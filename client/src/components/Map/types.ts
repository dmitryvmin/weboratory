import { TLngLat } from "@common/types";

export type TMapProps = {
  children?: any;
}

export type TMapRefState = {
  children?: any;
  mapCenterCoords?: TLngLat;
  mapZoom?: number;
}
