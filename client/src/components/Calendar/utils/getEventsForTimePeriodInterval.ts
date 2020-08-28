// Libs
import { isWithinInterval } from "date-fns";

// App
import { CalendarEvent, EventsDataMap } from "@components/Calendar/common/types";
import { formatDateToMapKey } from "@components/Calendar/utils/formatDateToMapKey";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";
import { IEvent } from "@common/types";

export type MockEventsDataType = {
  eventsDataArray: IEvent[];
  eventsDataMap: EventsDataMap;
};

/**
 * Returns an array of events mapped to DateMap keys:
 * [2020-10-10-23:00]: [CalendarEvent, CalendarEvent, ...]
 */
function getEventsForTimePeriodInterval({
  timePeriod,
  eventsData,
  intervalStart,
  intervalEnd,
}): MockEventsDataType {

  const eventsDataArray: IEvent[] = [];
  const eventsDataMap: EventsDataMap = {};

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

    if (eventsDataMap[timestamp] === undefined) {
      eventsDataMap[timestamp] = [];
    }

    eventsDataMap[timestamp].push(eventDatum);
    eventsDataArray.push(eventDatum);
  }

  return {
    eventsDataArray,
    eventsDataMap,
  };
}

export {getEventsForTimePeriodInterval};
