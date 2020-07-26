import { TCoords } from "@components/Events/types";

export const SeattleCoordinates: TCoords = [-122.335167, 47.608013];

export const MapInitialState = {
  clientLocation: SeattleCoordinates,
  mapInstance: undefined,
  mapRef: undefined,
};
