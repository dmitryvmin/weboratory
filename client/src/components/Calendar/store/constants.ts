import { ICalendarState } from "@components/Calendar/store/types";

export const CalendarInitState: ICalendarState = {
  period: "WEEK",
  isOpen: false,
  activeIndex: 1,
  xPosition: 0,
};

export const CalendarPeriod = [
  "HOUR",
  "DAY",
  "WEEK",
  "MONTH",
  "YEAR",
  "ALL",
] as const;

export const CalendarPeriodSegments = {
  "HOUR": {
    segment: "MINUTE",
    count: 60,
  },
  "DAY": {
    segment: "HOUR",
    count: 24,
  },
  "WEEK": {
    segment: "DAY",
    count: 7,
  },
  "MONTH": {
    segment: "WEEK",
    count: 4,
  },
  "YEAR": {
    segment: "MONTH",
    count: 12,
  },
  "ALL": {
    segment: "YEAR",
    count: 10,
  },
}
