import { CalendarEvent, CalendarIntervalData, DateMap, TimePeriod } from "@components/Calendar/common/types";
import { IEvent } from "@common/types";

export type TimeTablePeriodType = CalendarEvent[] | undefined[] | undefined | 0;

export type GetTimeTableDatesProps = {
  calDate: Date;
  calTimePeriod: TimePeriod;
  visibleSlideCount: number;
  bufferSlideCount?: number;
}

export type TimeTableDatesType = {
  curDate: Date;
  floorDate: Date;
  ceilingDate: Date;
}

export type TimeTableIntervalType = {
  intervalType: string;
  start: Date;
  end: Date;
  data?: CalendarIntervalData;
};

export type TimeTableIntervalCollectionType = TimeTableIntervalType[];

export type GetTimeTableMapsProps = TimeTableDatesType;

export type TimeTableMapsType = {
  curDateMap: DateMap;
  startDateMap: DateMap;
  endDateMap: DateMap;
}

export type CreateTimeTableProps = {
  calDate: Date;
  calTimePeriod: TimePeriod;
  visibleSlideCount: number;
  timeTable?: TimeTableType;
}

export type FillTimeTableProps = {
  timeTable: TimeTableType;
  timeTableDates: TimeTableDatesType;
  timeTableMaps: TimeTableMapsType;
  calTimePeriod: TimePeriod;
}

export type FillWholeProps = {
  calTimePeriod: TimePeriod;
  timePeriod: TimePeriod;
  date: Date;
}

export type TimeTableType = {
  [year: number]: TimeTablePeriodType;
}

export type FillIntervalProps = {
  calTimePeriod: TimePeriod;
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