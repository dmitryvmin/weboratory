import { EventsDataMap, TimePeriod } from "@components/Calendar/common/types";

export type CalendarMode = "CLOSED" | "DOCKED" | "FULLSCREEN";

export type CalendarStateType = {
  calMode: CalendarMode;
  calTimePeriod: TimePeriod;
  calStartDate: Date;
  calCurrentDate: Date;
  inViewEventsData: EventsDataMap | undefined;
  sliderXDistance: {
    distance: number | undefined;
    velocity?: number | undefined;
    duration?: number | undefined;
  } | undefined;
  slideCount: number;
  slideWidth: number;
}