import { CalendarState } from "@components/Calendar/store/types";

type UseCalendarFunction = {
  toggleCalendar(isOpen?: boolean): void;
  setCalendarIsOpen(isOpen: boolean): void;
  setIsFullScreen(isOpen: boolean): void;
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
}

export type UseCalendar = CalendarState & UseCalendarFunction;