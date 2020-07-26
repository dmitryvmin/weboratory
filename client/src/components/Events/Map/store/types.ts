import { TCoords } from "@components/Events/types";
import { ReactNode } from "react";

export type TMap = {
  center?: TCoords;
  children: any;
};

export type IMapContext = {
  // clientLocation: TCoords;
  mapInstance: undefined | any;
  mapRef: any;
}

export type IMapProvider = {
  children?: ReactNode;
}