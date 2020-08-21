// Libs
import { isWithinInterval } from "date-fns";

// App
import { EventsDataMap } from "@components/Calendar/common/types";
import { formatDateToMapKey } from "@components/Calendar/utils/formatDateToMapKey";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";

/**
 * Returns an array of events mapped to DateMap keys:
 * [2020-10-10-23:00]: [CalendarEvent, CalendarEvent, ...]
 */
function getEventsForTimePeriodInterval({
  timePeriod,
  eventsData,
  intervalStart,
  intervalEnd,
}): EventsDataMap {

  const eventMap: EventsDataMap = {};

  for (let i = 0; i < eventsData.length; i++) {
    const eventDatum = eventsData[i];

    if (!isWithinInterval(eventDatum.time, {
      start: intervalStart,
      end: intervalEnd,
    })) {
      continue;
    }

    const childTimePeriod = getChildTimePeriod(timePeriod);
    const timestamp = formatDateToMapKey(childTimePeriod, eventDatum.time);

    if (eventMap[timestamp] === undefined) {
      eventMap[timestamp] = [];
    }

    eventMap[timestamp].push(eventDatum);
  }

  return eventMap;
}

export {getEventsForTimePeriodInterval};
