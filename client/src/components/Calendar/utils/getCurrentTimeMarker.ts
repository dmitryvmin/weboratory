// Libs
import invariant from "invariant";

// App
import { TimeScaleValues } from "@stores/CalendarStore/types";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";

/**
 * Returns a timeMarker of [timeScale] duration starting at current time
 */
function getCurrentTimeMarker(timeScale: TimeScaleValues, x: number) {

  invariant(timeScale, "Couldn't get getCurrentTimeMarker. The [timeScale] object is falsy:", timeScale);

  const currentTime = new Date();
  const markerStart = currentTime;
  const markerEnd = getTimestamp(markerStart, timeScale, 1);

  return ({
    x: 0,
    start: currentTime,
    end: markerEnd,
  });
}

export { getCurrentTimeMarker };
