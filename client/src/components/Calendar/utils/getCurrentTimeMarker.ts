// Libs
import invariant from "invariant";

// App
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { TimePeriod } from "@stores/CalendarStore/types";

/**
 * Returns a timeMarker of [timeScale] duration starting at current time
 */
function getCurrentTimeMarker(timeScale: TimePeriod) {

  invariant(timeScale, "Couldn't get getCurrentTimeMarker. The [timeScale] object is falsy:", timeScale);

  const currentTime = new Date();
  const markerStart = currentTime;
  const markerEnd = getTimestamp(markerStart, timeScale, 1);

  return ({
    start: currentTime,
    end: markerEnd,
  });
}

export { getCurrentTimeMarker };
