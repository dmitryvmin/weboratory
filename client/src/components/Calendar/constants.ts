import { CalendarState, TimePeriod } from "@components/Calendar/store/types";

export const SLIDER_MARGIN = 20;

export const DRAG_STATUS = {
  NONE: "none",
  DRAG_STARTED: "drag started",
  DRAG_ENDED: "drag ended",
};

export const SLIDER_BUFFER = 1;

export const CalendarInitState: CalendarState = {
  timePeriod: "DAY",
  isOpen: true,
  xPosition: 0,
  calendarMarker: new Date,
  intervalData: undefined,
  slideCount: 1,
  slideWidth: 400,
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

export const DateFormatMap: {[key in TimePeriod]: string} = {
  "SECOND": "",
  "MINUTE": "",
  "HOUR": "",
  "DAY": "EEE, do",
  "MONTH": "",
  "YEAR": "",
}