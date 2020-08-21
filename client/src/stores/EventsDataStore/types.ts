import { CalendarEvent, EventsDataMap, TimePeriod } from "@components/Calendar/common/types";
import { Dispatch, SetStateAction } from "react";

export type EventsDataState = {
  eventsData: CalendarEvent[];
  intervalEventsDataMap: EventsDataMap;
};

export type EventsDataProviderType = any;

export type EventsDataContextType = [
  EventsDataState,
  Dispatch<SetStateAction<EventsDataState>>,
];

type UseEventsDataFunctions = {
  setAllEventsData(): void;
  setIntervalEventsDataMap(
    calendarTimePeriod: TimePeriod,
    calendarDate: Date,
  ): void;
  getIntervalEventsDataMap(
    calendarTimePeriod: TimePeriod,
    calendarDate: Date,
  ): EventsDataMap;
}

export type UseEventsDataReturnType = EventsDataState & UseEventsDataFunctions;