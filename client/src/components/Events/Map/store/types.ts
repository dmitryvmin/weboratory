import { TCoords } from "@components/Events/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type TMap = {
  center?: TCoords;
  children: any;
};

export type IMapState = {
  clientLocation: TCoords;
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
  clientLocation: TCoords;
  mapInstance: any;
  setMapInstance: any;
  setMapRef: any;
}