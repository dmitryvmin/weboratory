import { Dispatch, ReactNode, SetStateAction } from "react";
import { IEvent, TLngLat } from "@common/types";
import { PaddingOptions } from "react-mapbox-gl/lib/map";

export type IMapState = {
  mapCenterCoords: TLngLat;
  mapInstance: undefined | any;
  mapRef: any;
  mapZoom: number;
  activeMarker: TEventMarker | undefined;
}

// Marker can have all the properties of an IEvent
// but must contain coordinates and address
export type TEventMarker = {
  event_id: string;
  address: string;
  coordinates: TLngLat;
} & Partial<IEvent>;

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

export type CreateMarkerArgs = {
  address: string;
} & TEventMarker;

export type IUseMapFns = {
  setMapInstance: any;
  setMapRef: any;
  setMapCenterCoords(coords: IMapState["mapCenterCoords"]): void;
  centerMapOnClient(): Promise<any>;
  centerMapOnAddress(address: string): Promise<any>;
  centerMapOnCoords(coords: TLngLat): void;
  setMapZoom(zoom: IMapState["mapZoom"]): void;
  setMarker(CreateMarkerArgs): void;
  easeTo(EaseToArgs): void;
}

export type IUseMap = IUseMapFns & IMapState;
