// App
import { CalendarEvent, TimePeriod } from "@components/Calendar/common/types";
import { getTimeDifference } from "@components/Calendar/utils/getTimeDifference";

type GetEventMap = {
  eventMap: any[];
  mapHeight: number;
};

/**
 * Returns a map of Events mapped over time distance from [markerStart] time
 */
function getEventMap(
  data: CalendarEvent[],
  markerStart: Date,
  segmentPeriod: TimePeriod,
): GetEventMap | undefined {

  // If not data, return empty map
  if (!data) {
    return;
  }

  // Associative array of events with array index mapped to the
  // events' distance in [segmentPeriod] from [markerStart]
  const eventMap: any[] = [];

  // Highest number of events occurring on a [segmentPeriod]
  let mapHeight = 1;

  for (let i = 0; i < data.length; i++) {

    // Event item
    const calendarEvent: CalendarEvent = data[i];

    const distanceFromStart = getTimeDifference(markerStart, calendarEvent.time, segmentPeriod);

    // If nothing has been inserted at slot [distanceFromStart], add the event
    if (eventMap[distanceFromStart] === undefined) {
      eventMap[distanceFromStart] = [calendarEvent];
    }
    // Otherwise add this event to the array of events at index [distanceFromStart]
    else {
      eventMap[distanceFromStart] = [...eventMap[distanceFromStart], calendarEvent];

      // If current iteration produces a higher number of events per time instant
      // than has been captured by the mapHeight variable, update mapHeight
      const countAtSlot: number = eventMap[distanceFromStart].length;
      if (countAtSlot > mapHeight) {
        mapHeight = countAtSlot;
      }
    }
  }

  return {
    eventMap,
    mapHeight,
  };
}

export { getEventMap };