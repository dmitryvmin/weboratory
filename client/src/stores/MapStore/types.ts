import { Dispatch, ReactNode, SetStateAction } from "react";
import { TLngLat } from "@common/types";
import { PaddingOptions } from "react-mapbox-gl/lib/map";

export type IMapState = {
  mapCenterCoords: TLngLat;
  mapInstance: undefined | any;
  mapRef: any;
  mapZoom: number;
}

export type IMapContext = [
  IMapState,
  Dispatch<SetStateAction<IMapState>>,
];

export type IMapProvider = {
  children?: ReactNode;
}

export type EaseToArgs = {
  coords?: TLngLat;
  padding?: Partial<PaddingOptions>;
  zoom?: IMapState["mapZoom"];
}

export type IUseMapFns = {
  setMapInstance: any;
  setMapRef: any;
  setMapCenterCoords(coords: IMapState["mapCenterCoords"]): void;
  centerMapOnClient(): Promise<any>;
  centerMapOnAddress(address: string): Promise<any>;
  centerMapOnCoords(coords: TLngLat): void;
  setMapZoom(zoom: IMapState["mapZoom"]): void;
  easeTo(EaseToArgs): void;
  flyTo(args: any): void;
}

export type IUseMap = IUseMapFns & IMapState;
