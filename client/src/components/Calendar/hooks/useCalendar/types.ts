import { CalendarState } from "@components/Calendar/store/types";

type UseCalendarFunction = {
  setCalendarIsOpen(isOpen: boolean): void;
  zoomIn(): void;
  zoomOut(): void;
  isAtMaxPeriod(): boolean;
  isAtMinPeriod(): boolean;
  setIntervalData(eventsData: any): void;
  setSlideCount(slideCount: number): void;
  setSlideWidth(width: number): void;
  setStartingDate(date: Date): void;
  setCurrentDate(date: Date): void;
  setXDistance(args: CalendarState["xDistance"]): void;
  setIsFullScreen(isFullScreen: boolean): void;
}

export type UseCalendar = CalendarState & UseCalendarFunction;