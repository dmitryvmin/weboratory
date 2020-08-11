// Libs
import {
  addDays,
  addHours,
  addMinutes, addMonths,
  addWeeks,
  addYears, subDays, subHours, subMinutes, subMonths, subYears,
} from "date-fns";
import invariant from "invariant";

// App
import { TimeScaleValues } from "@stores/CalendarStore/types";

/**
 * Returns a timestamp offset by [numOf] of [timeScale] starting at [start]
 */
function getTimestamp(
  start: Date,
  timeScale: TimeScaleValues,
  numOf = 1,
): Date {

  invariant(start, "Couldn't getTimestamp, timeMarker value is falsy", start);
  invariant(timeScale, "Couldn't getTimestamp, timeScale value is falsy", timeScale);

  // TODO: simplify - use -[value] on the date-fn sub methods
  switch (timeScale) {
    case "MINUTE":
      return (numOf > 0)
        ? addMinutes(start, numOf)
        : subMinutes(start, Math.abs(numOf));
    case "HOUR":
      return (numOf > 0)
        ? addHours(start, numOf)
        : subHours(start, Math.abs(numOf));
    case "DAY":
      return (numOf > 0)
        ? addDays(start, numOf)
        : subDays(start, Math.abs(numOf));
    case "MONTH":
      return (numOf > 0)
        ? addMonths(start, numOf)
        : subMonths(start, Math.abs(numOf));
    case "YEAR":
      return (numOf > 0)
        ? addYears(start, numOf)
        : subYears(start, Math.abs(numOf));
    default:
      return start;
  }
}

export { getTimestamp };
