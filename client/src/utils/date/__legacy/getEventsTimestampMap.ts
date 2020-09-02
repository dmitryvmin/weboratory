import { EventsDataMap } from "@components/Calendar/common/types";
import { getChildTimePeriod } from "@utils/date/getChildTimePeriod";
import { formatDateToMapKey } from "@utils/date/formatDateToMapKey";

/**
 * Returns an object of events mapped to DateMap keys:
 * [2020-10-10-23:00]: [CalendarEvent, CalendarEvent, ...]
 */
export function getEventsTimestampMap({
  timePeriod,
  eventsData,
}): EventsDataMap {

  const childTimePeriod = getChildTimePeriod(timePeriod);
  const eventsDataMap: EventsDataMap = {};

  for (let i = 0; i < eventsData.length; i++) {
    const event = eventsData[i];
    const timestamp = formatDateToMapKey(childTimePeriod, event.time);
    eventsDataMap[timestamp] = [];
  }

  return eventsDataMap;
}
