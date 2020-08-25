import { CalendarEvent, DateMap, TimePeriod } from "@components/Calendar/common/types";

export type TimeTablePeriodType = CalendarEvent[] | undefined[] | undefined | 0;

export type GetTimeTableDatesProps = {
  calendarDate: Date;
  calendarTimePeriod: TimePeriod;
  visibleSlideCount?: number;
}

export type TimeTableDatesType = {
  curDate: Date;
  floorDate: Date;
  ceilingDate: Date;
}

export type GetTimeTableMapsProps = TimeTableDatesType;

export type TimeTableMapsType = {
  curDateMap: DateMap;
  startDateMap: DateMap;
  endDateMap: DateMap;
}

export type CreateTimeTableProps = {
  calendarDate: Date;
  calendarTimePeriod: TimePeriod;
  visibleSlideCount: number;
  timeTable?: TimeTableType;
}

export type FillTimeTableProps = {
  timeTable: TimeTableType;
  timeTableDates: TimeTableDatesType;
  timeTableMaps: TimeTableMapsType;
  calendarTimePeriod: TimePeriod;
}

export type FillWholeProps = {
  calendarTimePeriod: TimePeriod;
  timePeriod: TimePeriod;
  date: Date;
}

export type TimeTableType = {
  [year: number]: TimeTablePeriodType;
}

export type FillIntervalProps = {
  calendarTimePeriod: TimePeriod;
  timeTableDates: TimeTableDatesType;
  intervalTimePeriod: TimePeriod;
  intervalStart: Date;
  intervalEnd: Date;
}

export type UseTimeTableProps = {
  currentDate: Date;
  timePeriod: TimePeriod;
  slideCount: number;
}