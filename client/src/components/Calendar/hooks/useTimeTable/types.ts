import { CalendarEvent, DateMap, TimePeriod } from "@components/Calendar/common/types";

export type TimeTablePeriodType = CalendarEvent[] | undefined[] | undefined | 0;

export type GetTimeTableDatesProps = {
  calendarDate: Date;
  calendarTimePeriod: TimePeriod;
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
  timeTable?: TimeTable;
}

export type FillTimeTableProps = {
  timeTable: TimeTable;
  timeTableDates: TimeTableDatesType;
  timeTableMaps: TimeTableMapsType
  calendarTimePeriod: TimePeriod;
}

export type FillWholeProps = {
  calendarTimePeriod: TimePeriod;
  timePeriod: TimePeriod;
  date: Date;
}

export type TimeTable = {
  [year: number]: TimeTablePeriodType;
}

export type FillIntervalProps = {
  calendarTimePeriod: TimePeriod;
  intervalTimePeriod: TimePeriod;
  intervalStart: Date;
  intervalEnd: Date;
}

export type UseTimeTableProps = {
  currentDate: Date;
  timePeriod: TimePeriod;
  slideCount: number;
}