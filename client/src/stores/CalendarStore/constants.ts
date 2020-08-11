import {
  CalendarState,
  TimeFormatMapInterface,
  TimeSegmentMapInterface,
} from "@stores/CalendarStore/types";

export const CalendarInitState: CalendarState = {
  timeScale: "DAY",
  isOpen: true,
  xPosition: 0,
  calendarMarker: new Date,
  intervalData: undefined,
  // sliderRef: null,
};

export const TimeFormatMap: TimeFormatMapInterface = {
  "MINUTE": "mm",
  "HOUR": "hh",
  "DAY": "dd",
  // "WEEK": "ww",
  "MONTH": "mm",
  "YEAR": "yyyy",
  "ALL": "",
};

export const TimeScaleMap = [
  "SECOND",
  "MINUTE",
  "HOUR",
  "DAY",
  // "WEEK",
  "MONTH",
  "YEAR",
  "ALL",
] as const;

export const TimeScaleSegmentMap: TimeSegmentMapInterface = {
  "MINUTE": "SECOND",
  "HOUR": "MINUTE",
  "DAY": "HOUR",
  // "WEEK": "DAY",
  "MONTH": "DAY",
  "YEAR": "MONTH",
  "ALL": "YEAR",
} as const;
