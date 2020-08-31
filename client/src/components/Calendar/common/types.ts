import { IEvent } from "@common/types";

export type TimePeriod =
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "MONTH"
  | "YEAR"
  ;

export type SegmentInterval = {
  start: number;
  end: number;
}

export type Interval = {
  start: Date;
  end: Date;
}

export type CalendarEvent = {
  time: Date;
} & Partial<IEvent>;

export type EventsDataMap = {
  [timestamp: string]: CalendarEvent[];
}

export type IntervalType = {
  start: number;
  end: number;
}

export type DateMap = {
  YEAR: number;
  MONTH: number;
  DAY: number;
  HOUR: number;
  MINUTE: number;
}

export type CalendarIntervalData = {
  data: IEvent[];
  dataMap: EventsDataMap;
}
