// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { IEvent, TLngLat } from "@common/types";
import { TEventModal } from "@components/Events/EventModal/types";

export type ActiveEvent = {
  markerNode?: HTMLDivElement;
} & Partial<IEvent>;

export type IEventsState = {
  activeEvent: ActiveEvent | undefined;
  isSearchOpen: boolean;
  isEventOpen: boolean;
  isMenuOpen: boolean;
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
  // animateFromNode: TEventModal["animateFromNode"];
} & Partial<IEvent>;

export type IUseEventsFunctions = {
  setIsSearchOpen(isOpen: boolean): void;
  setIsEventOpen(isOpen: boolean): void;
  setEvent(CreateEventArgs, isOpen?: boolean): void;
  closeSearch(): void;
  openSearch(): void;
  openEvent(event?: ActiveEvent): void;
  // openEvent(event: ActiveEvent): void;
  closeEvent(): void;
  startNewEvent(): Promise<any>;
  updateActiveEvent(eventData: ActiveEvent): void;
  setIsMenuOpenTo(isMenuOpen: boolean): void;
  setSearchedAddressTo(address: string): void;
}

export type IUseEvents = IUseEventsFunctions & IEventsState;
