// Libs
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

// App
import { TimePeriod } from "@stores/CalendarStore/types";

/**
 * Returns the [timeScale] difference between the [start] and [end] dates
 */
function getTimeDifference(
  start: Date,
  end: Date,
  timeScale: TimePeriod,
): number {

  switch (timeScale) {
    case "MINUTE":
      return differenceInMinutes(end, start);
    case "HOUR":
      return differenceInHours(end, start);
    case "DAY":
      return differenceInDays(end, start);
    // case "WEEK":
    //   return differenceInWeeks(end, start);
    case "MONTH":
      return differenceInMonths(end, start);
    case "YEAR":
      return differenceInYears(end, start);
    default:
      return 0;
  }

  // return Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())));
}

export { getTimeDifference };
