// Libs
import { isWithinInterval } from "date-fns";

// App
import { IEvent } from "@common/types";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";
import { CalendarIntervalData, EventsDataMap } from "@components/Calendar/common/types";
import { formatDateToMapKey } from "@components/Calendar/utils/formatDateToMapKey";

/**
 * Returns an array of events that fall within intervalStart - intervalEnd range
 * TODO: this will be a call to the Events API /events/start:${date};end:${date}
 */
function getEventsDataForTimeTableInterval({
  eventsData,
  intervalStart,
  intervalEnd,
  formattedBy,
}): CalendarIntervalData {

  const childTimePeriod = getChildTimePeriod(formattedBy);
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

    eventsDataArray.push(eventDatum);
    const timestamp = formatDateToMapKey(childTimePeriod, eventDatum.time);
    if (!eventsDataMap[timestamp]) {
      eventsDataMap[timestamp] = [];
    }
    eventsDataMap[timestamp].push(eventDatum)
  }

  return ({
    data: eventsDataArray,
    dataMap: eventsDataMap,
  });
}

export {getEventsDataForTimeTableInterval};
