// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { IEvent, TLngLat } from "@common/types";
import { TEventModal } from "@components/Events/EventModal/types";

export type IEventsState = {
  activeEvent: TEventModal | undefined;
  isSearchOpen: boolean;
  isEventOpen: boolean;
  searchedAddress: string | undefined;
}

export type IEventsContext = [
  IEventsState,
  Dispatch<SetStateAction<IEventsState>>,
];

export type IEventsProvider = {
  children?: ReactNode;
}

export type CreateEventArgs = {
  markerNode: TEventModal["markerNode"];
  animateFromNode: TEventModal["animateFromNode"];
} & Partial<IEvent>;

export type IUseEventsFunctions = {
  setIsSearchOpen(isOpen: boolean): void;
  setIsEventOpen(isOpen: boolean): void;
  setSearchedAddress(address: string): void;
  setEvent(CreateEventArgs): void;
  closeSearch(): void;
  openSearch(): void;
  openEvent(): void;
  closeEvent(): void;
}

export type IUseEvents = IUseEventsFunctions & IEventsState;
