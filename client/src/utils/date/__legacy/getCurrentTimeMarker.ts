// Libs
import { startOfToday } from "date-fns";
import invariant from "invariant";

// App
import { TimePeriod } from "@components/Calendar/common/types";
import { getDateAdjustedBy } from "@utils/date/getDateAdjustedBy";

/**
 * Returns a timeMarker of [timeScale] duration starting at current time
 */
function getCurrentTimeMarker(timeScale: TimePeriod) {

  invariant(timeScale, "Couldn't get getCurrentTimeMarker. The [timeScale] object is falsy:", timeScale);

  const currentTime = startOfToday();
  const markerStart = currentTime;
  const markerEnd = getDateAdjustedBy(markerStart, timeScale, 1);

  return ({
    start: currentTime,
    end: markerEnd,
  });
}

export { getCurrentTimeMarker };
