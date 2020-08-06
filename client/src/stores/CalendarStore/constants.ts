import {
  ICalendarState,
  TypeTimeSegments,
} from "@stores/CalendarStore/types";

export const CalendarInitState: ICalendarState = {
  timeScale: "HOUR",
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
    segmentLabel: "SECONDS",
    segmentCount: 60,
  },
  "HOUR": {
    segmentLabel: "MINUTES",
    segmentCount: 60,
  },
  "DAY": {
    segmentLabel: "HOURS",
    segmentCount: 24,
  },
  "WEEK": {
    segmentLabel: "DAYS",
    segmentCount: 7,
  },
  "MONTH": {
    segmentLabel: "WEEKS",
    segmentCount: 4,
  },
  "YEAR": {
    segmentLabel: "MONTHS",
    segmentCount: 12,
  },
  "ALL": {
    segmentLabel: "YEARS",
    segmentCount: 10,
  },
};
