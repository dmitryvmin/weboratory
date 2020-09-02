import { TimePeriod } from "@components/Calendar/common/types";

export type CalendarMode = "CLOSED" | "DOCKED" | "FULLSCREEN";

export type SegmentType = {
  startDate: Date;
  endDate: Date;
}

export type CalendarStateType = {
  calMode: CalendarMode;
  calTimePeriod: TimePeriod;
  calStartDate: Date;
  calCurrentDate: Date;
  hoveredSegment?: SegmentType | undefined;
}