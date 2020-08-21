// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { CalendarEvent, TimePeriod } from "@components/Calendar/common/types";

export type CalendarState = {
  timePeriod: TimePeriod;
  isOpen: boolean;
  isFullScreen: boolean;
  startingDate: Date;
  currentDate: Date;
  intervalData: CalendarEvent[] | undefined;
  slideCount: number;
  slideWidth: number;
  xDistance: {
    distance: number;
    velocity: number;
  };
};

export type CalendarContextInterface = [
  CalendarState,
  Dispatch<SetStateAction<CalendarState>>,
];

export type CalendarProviderInterface = {
  children: ReactNode;
}


