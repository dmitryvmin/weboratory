import { DateMap, TimePeriod } from "@components/Calendar/store/types";

export type MyComponentProps = {
  date: Partial<DateMap>;
  content: any;
  timePeriod: TimePeriod;
  calendarMarker: Date;
  slideWidth: number;
};