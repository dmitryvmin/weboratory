import { IEventsState } from "./types";
import { TEventModal } from "@components/Events/EventModal/types";
import { format } from "date-fns";

export const EventsInitialState: IEventsState = {
  activeEvent: undefined,
  isSearchOpen: false,
  isEventOpen: false,
  isMenuOpen: false,
  searchedAddress: "",
};

const today = format(
  new Date(),
  "mm-dd-yyyy",
);

export const InitialEvent: TEventModal = {
  markerNode: undefined,
  eventId: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  time: today,
  title: "",
  content: "",
  visibility: "PUBLIC",
  address: "",
  coordinates: undefined,
};

export const SEARCH_MIN = 8;