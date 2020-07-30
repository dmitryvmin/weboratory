import { Dispatch, ReactNode, SetStateAction } from "react";
import { CalendarPeriod } from "@stores/CalendarStore/constants";

export type CalendarPeriodTuple = typeof CalendarPeriod;
export type TCalendarPeriodTuple = CalendarPeriodTuple[number];

export type ICalendarState = {
  period: TCalendarPeriodTuple;
  isOpen: boolean;
  activeIndex: number;
  xPosition: number;
};

export type ICalendarContext = [
  ICalendarState,
  Dispatch<SetStateAction<ICalendarState>>,
];

export type ICalendarProvider = {
  children: ReactNode;
}
