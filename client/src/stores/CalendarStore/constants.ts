import {
  ICalendarState,
  TypeTimeSegments,
} from "@stores/CalendarStore/types";

export const CalendarInitState: ICalendarState = {
  timeScale: "DAY",
  isOpen: true,
  centerTimeMarker: undefined,
  xPosition: 0,
};

export const TimeFormatMap = {
  "MINUTE": "mm",
  "HOUR": "hh",
  "DAY": "dd",
  "WEEK": "ww",
  "MONTH": "mm",
  "YEAR": "yyyy",
  "ALL": "",
}

export const TimeScaleEnum = [
  "SECOND",
  "MINUTE",
  "HOUR",
  "DAY",
  "WEEK",
  "MONTH",
  "YEAR",
  "ALL",
] as const;

export const TimeSegments: TypeTimeSegments = {
  "MINUTE": {
    segmentPeriod: "SECOND",
    segmentCount: 60,
  },
  "HOUR": {
    segmentPeriod: "MINUTE",
    segmentCount: 60,
  },
  "DAY": {
    segmentPeriod: "HOUR",
    segmentCount: 24,
  },
  "WEEK": {
    segmentPeriod: "DAY",
    segmentCount: 7,
  },
  "MONTH": {
    segmentPeriod: "WEEK",
    segmentCount: 4,
  },
  "YEAR": {
    segmentPeriod: "MONTH",
    segmentCount: 12,
  },
  "ALL": {
    segmentPeriod: "YEAR",
    segmentCount: 10,
  },
};
