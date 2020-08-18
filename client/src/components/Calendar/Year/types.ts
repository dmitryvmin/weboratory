import { DateMap, TimePeriod } from "@components/Calendar/store/types";

export type YearProps = {
  date: Partial<DateMap>;
  content: any[] | undefined;
  timePeriod: TimePeriod;
  calendarMarker: Date;
  slideWidth: number;
};