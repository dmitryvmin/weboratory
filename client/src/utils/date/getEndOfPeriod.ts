// Libs
import { endOfDay, endOfHour, endOfMinute, endOfMonth, endOfYear } from "date-fns";
import { log } from "@dmitrymin/fe-log";

// App
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns the starting of the timePeriod
 */
function getEndOfPeriod(
  timePeriod: TimePeriod,
  date: Date,
): Date {
  switch (timePeriod) {
    case "MINUTE":
      return endOfMinute(date);
    case "HOUR":
      return endOfHour(date);
    case "DAY":
      return endOfDay(date);
    // case "WEEK":
    //   return differenceInWeeks(end, start);
    case "MONTH":
      return endOfMonth(date);
    case "YEAR":
      return endOfYear(date);
    default:
      log({ logLevel: "warn" }, "Couldn't get end of timePeriod", timePeriod, "for date", date);
      return date;
  }
}

export { getEndOfPeriod };
