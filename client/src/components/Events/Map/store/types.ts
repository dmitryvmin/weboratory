import { TCoords, TLngLat } from "@components/Events/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type IMapState = {
  mapCenter: TCoords;
  mapInstance: undefined | any;
  mapRef: any;
}

export type IMapContext = [
  IMapState,
  Dispatch<SetStateAction<IMapState>>,
];

export type IMapProvider = {
  children?: ReactNode;
}

export type IUseMap = {
  mapCenter: TCoords;
  mapInstance: any;
  setMapInstance: any;
  setMapRef: any;
  setMapCenter(coords: TLngLat | undefined): void;
}