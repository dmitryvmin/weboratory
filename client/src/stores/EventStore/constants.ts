import { IEventsState } from "./types";
import { TEventModal } from "@components/Events/EventModal/types";

export const EventsInitialState: IEventsState = {
  activeEvent: undefined,
  isSearchOpen: true,
  isEventOpen: false,
  searchedAddress: "",
};

export const InitialEvent: TEventModal = {
  markerNode: null,
  animateFromNode: null,
  event_id: undefined,
  created_at: undefined,
  updated_at: undefined,
  time: undefined,
  title: undefined,
  content: undefined,
  visibility: "PUBLIC",
};

export const SEARCH_MIN = 8;