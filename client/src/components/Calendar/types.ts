import { IEvent } from "@common/types";

export type TCalendarProps = any;

export type CalendarEvent = {
  color: string;
  time: Date; // string
} & Partial<Omit<IEvent, "time">>;

export type Timetable = any;