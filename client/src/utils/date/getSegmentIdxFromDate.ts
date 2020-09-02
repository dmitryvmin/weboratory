// Libs
import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";

// App
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns segment idx from a date's timePeriod
 */
function getSegmentIdxFromDate(
  timePeriod: TimePeriod,
  date: Date,
): number {
  switch (timePeriod) {
    case "MINUTE":
      return getMinutes(date);
    case "HOUR":
      return getHours(date);
    case "DAY":
      return getDate(date);
    case "MONTH":
      return getMonth(date);
    case "YEAR":
    default:
      return getYear(date);
  }
}

export { getSegmentIdxFromDate };
