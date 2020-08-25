// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { CalendarEvent, TimePeriod } from "@components/Calendar/common/types";

export type CalendarState = {
  timePeriod: TimePeriod;
  isCalendarOpen: boolean;
  isFullScreen: boolean;
  startingDate: Date;
  currentDate: Date;
  intervalData: CalendarEvent[] | undefined;
  slideCount: number;
  slideWidth: number;
  xDistance: {
    distance: number | undefined;
    velocity?: number | undefined;
    duration?: number | undefined;
  };
};

export type CalendarContextInterface = [
  CalendarState,
  Dispatch<SetStateAction<CalendarState>>,
];

export type CalendarProviderInterface = {
  children: ReactNode;
}


