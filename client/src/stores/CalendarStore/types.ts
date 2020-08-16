// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { CalendarEvent } from "@components/Calendar/types";

export type TimePeriod = "SECOND" | "MINUTE" | "HOUR" | "DAY" | "MONTH" | "YEAR";

export type TimeMarker = {
  start: Date;
  end: Date;
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
};

export type CalendarContextInterface = [
  CalendarState,
  Dispatch<SetStateAction<CalendarState>>,
];

export type CalendarProviderInterface = {
  children: ReactNode;
}

type UseCalendarFunction = {
  setCalendarIsOpen: any;
  zoomIn: any;
  zoomOut: any;
  isFirstPeriod: any;
  isLastPeriod: any;
  moveLeft: any;
  moveRight: any;
  setCalendarMarker: any;
  setIntervalData: any;
  setSlideCount(slideCount: number): void;
}

export type UseCalendar = CalendarState & UseCalendarFunction;
