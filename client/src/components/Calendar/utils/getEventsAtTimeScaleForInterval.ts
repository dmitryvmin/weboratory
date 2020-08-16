// Libs
import { isWithinInterval } from "date-fns";

// App
import { formatDateToMapKey } from "@components/Calendar/utils/formatDateToMapKey";
import { CalendarEvent } from "@components/Calendar/types";

export type EventsDataMap = {
  [timestamp: string]: CalendarEvent[];
}

function getEventsAtTimeScaleForInterval({
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

    // const timestamp = formatDateToMapKey(timeScale, eventDatum.time);
    const timestamp = formatDateToMapKey("MINUTE", eventDatum.time);

    if (eventMap[timestamp] === undefined) {
      eventMap[timestamp] = [];
    }

    eventMap[timestamp].push(eventDatum);
  }

  return eventMap;
}

export {getEventsAtTimeScaleForInterval};
