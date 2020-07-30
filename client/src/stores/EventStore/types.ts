// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { IEvent, TLngLat } from "@common/types";
import { TEventModal } from "@components/Events/EventModal/types";

export type ActiveEvent = {
  markerNode: HTMLDivElement | null;
  // animateFromNode: HTMLDivElement | null;
} & Partial<IEvent>;

export type IEventsState = {
  activeEvent: ActiveEvent | undefined;
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
  // animateFromNode: TEventModal["animateFromNode"];
} & Partial<IEvent>;

export type IUseEventsFunctions = {
  setIsSearchOpen(isOpen: boolean): void;
  setIsEventOpen(isOpen: boolean): void;
  setSearchedAddress(address: string): void;
  setEvent(CreateEventArgs, isOpen?: boolean): void;
  closeSearch(): void;
  openSearch(): void;
  openEvent(event?: ActiveEvent): void;
  // openEvent(event: ActiveEvent): void;
  closeEvent(): void;
  startNewEvent: any;
}

export type IUseEvents = IUseEventsFunctions & IEventsState;
