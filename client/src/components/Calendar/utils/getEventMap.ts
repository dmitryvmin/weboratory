// App
import { TimeScaleEnumValues } from "@stores/CalendarStore/types";
import { getTimeDifference } from "@components/Calendar/utils/getTimeDifference";

type GetEventMap = {
  eventMap: any[];
  mapHeight: number;
};

/**
 * Returns a map of Events mapped over time distance from [markerStart] time
 */
function getEventMap(
  data: any[],
  markerStart: Date,
  segmentPeriod: TimeScaleEnumValues,
): GetEventMap | undefined {

  // If not data, return empty map
  if (!data) {
    return;
  }

  const eventMap: any[] = [];
  let mapHeight: number = 1;

  for (let i = 0; i < data.length; i++) {

    // Event item
    const datum = data[i];
    const distanceFromStart = getTimeDifference(markerStart, datum, segmentPeriod);
    const atSlot = eventMap[distanceFromStart];

    // If nothing has been inserted at this slot, add the event
    if (atSlot === undefined) {
      eventMap[atSlot] = datum;
    }
    else {
      eventMap[i] = [...eventMap[i], datum];

      // If current iteration produces a higher number of events per time instant
      // than has been captured by the mapHeight variable, update mapHeight
      const countAtSlot: number = eventMap[atSlot].length;
      if (countAtSlot + 1 > mapHeight) {
        mapHeight = countAtSlot + 1;
      }
    }
  }

  return { eventMap, mapHeight };
}

export { getEventMap };