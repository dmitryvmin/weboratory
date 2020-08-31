import { EventsDataMap, TimePeriod } from "@components/Calendar/common/types";
import { TimeTable } from "@components/Calendar/utils/TimeTable";
import { TimeTableIntervalType } from "@components/Calendar/utils/TimeTable/types";

export type CalendarMode = "CLOSED" | "DOCKED" | "FULLSCREEN";

type MoveInfoType = {
  distance: number | undefined;
  velocity?: number | undefined;
  duration?: number | undefined;
};

export type CalendarStateType = {
  calMode: CalendarMode;
  calTimePeriod: TimePeriod;
  calStartDate: Date;
  calCurrentDate: Date;
  inViewEventsData: EventsDataMap | undefined;
  sliderXDistance: MoveInfoType | undefined;
  slideCount: number | undefined;
  slideWidth: number | undefined;
  timeTable: TimeTable | undefined;
  timeTableIntervals: TimeTableIntervalType[] | undefined;
}