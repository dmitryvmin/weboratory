import { DateMap, TimePeriod } from "@components/Calendar/common/types";

export type SlideProps = {
  slideTimePeriod: TimePeriod;
  slideDateMap: Partial<DateMap>;
  slideContent: any[]; // TimeTablePeriodType;
  slideWidth: number;
};
