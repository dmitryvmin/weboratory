import {
  CalendarState,
  TimePeriod,
} from "@stores/CalendarStore/types";

export const CalendarInitState: CalendarState = {
  timePeriod: "DAY",
  isOpen: true,
  xPosition: 0,
  calendarMarker: new Date,
  intervalData: undefined,
  slideCount: 1,
};

export const TimeFormatMap: {[key in TimePeriod]: string} = {
  "SECOND": "ss",
  "MINUTE": "mm",
  "HOUR": "hh",
  "DAY": "dd",
  "MONTH": "mm",
  "YEAR": "yyyy",
};

export const TimePeriodMap: TimePeriod[] = [
  "SECOND",
  "MINUTE",
  "HOUR",
  "DAY",
  "MONTH",
  "YEAR",
];
