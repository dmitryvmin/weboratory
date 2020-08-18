// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { IEvent } from "@common/types";

export type TimePeriod =
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "MONTH"
  | "YEAR"
  ;

export type TimeMarker = {
  start: Date;
  end: Date;
}

export type CalendarEvent = {
  color: string;
  time: Date;
} & Partial<Omit<IEvent, "time">>;

export type EventsDataMap = {
  [timestamp: string]: CalendarEvent[];
}

export type IntervalType = {
  start: number;
  end: number;
}

export type DateMap = {
  YEAR: number;
  MONTH: number;
  DAY?: number;
  HOUR?: number;
  MINUTE?: number;
}

export type CalendarState = {
  timePeriod: TimePeriod;
  isOpen: boolean;
  xPosition: number;
  calendarMarker: Date;
  intervalData: CalendarEvent[] | undefined;
  slideCount: number;
  // leftBufferRef: HTMLDivElement | null;
  // rightBufferRef: HTMLDivElement | null;
  slideWidth: number;
};

export type CalendarContextInterface = [
  CalendarState,
  Dispatch<SetStateAction<CalendarState>>,
];

export type CalendarProviderInterface = {
  children: ReactNode;
}

type UseCalendarFunction = {
  setCalendarIsOpen(isOpen: boolean): void;
  zoomIn(): void;
  zoomOut(): void;
  isFirstPeriod(): boolean;
  isLastPeriod(): boolean;
  moveLeft: any;
  moveRight: any;
  setCalendarMarker(marker: Date): void;
  setIntervalData(eventsData: any): void;
  setSlideCount(slideCount: number): void;
  setSlideWidth(width: number): void;
  // setLeftBufferRef(ref: HTMLDivElement): void;
  // setRightBufferRef(ref: HTMLDivElement): void;
}

export type UseCalendar = CalendarState & UseCalendarFunction;
