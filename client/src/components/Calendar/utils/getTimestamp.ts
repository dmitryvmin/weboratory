// Libs
import { TimeScaleEnumValues } from "@stores/CalendarStore/types";
import { addDays, addHours, addMinutes, addWeeks, addYears } from "date-fns";
import invariant from "invariant";

/**
 * Returns a timestamp offset by [numOf] of [timeScale] starting at [start]
 */
function getTimestamp(
  start: Date,
  timeScale: TimeScaleEnumValues,
  numOf = 1,
): Date {

  invariant(start, "Couldn't getTimestamp, timeMarker value is falsy", start);
  invariant(timeScale, "Couldn't getTimestamp, timeScale value is falsy", timeScale);

  switch (timeScale) {
    case "MINUTE":
      return addMinutes(start, numOf);
    case "HOUR":
      return addHours(start, numOf);
    case "DAY":
      return addDays(start, numOf);
    case "WEEK":
      return addWeeks(start, numOf);
    case "MONTH":
      return addHours(start, numOf);
    case "YEAR":
      return addYears(start, numOf);
    default:
      return start;
  }
}

export {getTimestamp};
