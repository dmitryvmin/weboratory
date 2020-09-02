// Libs
import { isWithinInterval } from "date-fns";

// Types
import { IEvent } from "@common/types";
import { CalendarIntervalData, EventsDataMap } from "@components/Calendar/common/types";

// Utils
import { getChildTimePeriod } from "@utils/date/getChildTimePeriod";
import { formatDateToMapKey } from "@utils/date/formatDateToMapKey";

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
