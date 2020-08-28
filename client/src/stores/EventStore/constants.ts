import { IEventsState } from "./types";
import { format } from "date-fns";

export const EventsInitialState: IEventsState = {
  activeEvent: undefined,
  isSearchOpen: false,
  isEventOpen: false,
  isMenuOpen: false,
  searchedAddress: "",
};

export const SEARCH_MIN = 8;