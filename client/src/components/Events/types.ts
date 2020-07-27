import { IEvent } from "@common/types";

export type TCoords = [number, number];

export type TLngLat = {
  lat: number;
  lng: number;
}

export type TMapEvent = {
  startPosition: DOMRect;
  startFromSearch: boolean;
  location: string;
  coordinates: TLngLat;
} & Partial<IEvent>;

export type TEventModal = {
  setEventOpen: any;
  isEventOpen: boolean;
  startPosition: DOMRect;
  startFromSearch: boolean;
  location: string;
  coordinates: TLngLat;
  created_at?: string;
  updated_at?: string;
  time?: string;
  title?: string;
} & Partial<IEvent>;
