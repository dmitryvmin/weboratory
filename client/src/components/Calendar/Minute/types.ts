import { CalendarEvent, DateMap } from "@components/Calendar/store/types";

export type MinuteProps = {
  date: Partial<DateMap>;
  content: CalendarEvent[] | undefined;
};
