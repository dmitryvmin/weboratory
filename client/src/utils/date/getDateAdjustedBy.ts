// Libs
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
} from "date-fns";
import invariant from "invariant";

// App
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns a Date offset by [numOfIntervals] of [timeScale] starting at [start]
 */
function getDateAdjustedBy(
  start: Date,
  timeScale: TimePeriod,
  numOfIntervals,
): Date {

  invariant(start, "Couldn't getTimestamp, timeMarker value is falsy", start);
  invariant(timeScale, "Couldn't getTimestamp, timeScale value is falsy", timeScale);

  if (!numOfIntervals) {
    return start;
  }

  switch (timeScale) {
    case "MINUTE":
      return addMinutes(start, numOfIntervals);
    case "HOUR":
      return addHours(start, numOfIntervals);
    case "DAY":
      return addDays(start, numOfIntervals);
    case "MONTH":
      return addMonths(start, numOfIntervals);
    case "YEAR":
      return addYears(start, numOfIntervals);
    default:
      return start;
  }
}

export { getDateAdjustedBy };