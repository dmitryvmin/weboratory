// Libs
import { startOfDay, startOfHour, startOfMinute, startOfMonth, startOfYear } from "date-fns";
import { log } from "@dmitrymin/fe-log";

// App
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns the starting of the timePeriod
 */
function getStartOfPeriod(
  timePeriod: TimePeriod,
  date: Date,
): Date {
  switch (timePeriod) {
    case "MINUTE":
      return startOfMinute(date);
    case "HOUR":
      return startOfHour(date);
    case "DAY":
      return startOfDay(date);
    // case "WEEK":
    //   return differenceInWeeks(end, start);
    case "MONTH":
      return startOfMonth(date);
    case "YEAR":
      return startOfYear(date);
    default:
      log({ logLevel: "warn" }, "Couldn't get start of timePeriod", timePeriod, "for date", date);
      return date;
  }
}

export { getStartOfPeriod };
