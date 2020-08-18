// Libs
import { log } from "@dmitrymin/fe-log";

// App
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { lastDayOfMonth } from "date-fns";
import { TimePeriod } from "@components/Calendar/store/types";

/**
 * Return a date which start at the [date]'s [timeScale]
 * with all the base timeScales beginning at 0
 */
function getBaseDate(
  date: Date,
  timeScale: TimePeriod,
  direction: "floor" | "ceiling",
): Date {

  const { YEAR, MONTH, DAY, HOUR, MINUTE } = getMapFromDate(date);
  let baseDate;

  if (direction === "floor") {
    switch (timeScale) {
      case "MINUTE":
        baseDate = new Date(YEAR, MONTH, DAY, HOUR, MINUTE);
        break;
      case "HOUR":
        baseDate = new Date(YEAR, MONTH, DAY, HOUR, 0);
        break;
      case "DAY":
        baseDate = new Date(YEAR, MONTH, DAY, 0, 0);
        break;
      case "MONTH":
        baseDate = new Date(YEAR, MONTH, 1, 0, 0);
        break;
      case "YEAR":
        baseDate = new Date(YEAR, 0, 1, 0, 0);
        break;
      default:
        log({ logLevel: "error" }, `Couldn't get BaseStartDate for ${date} of timeScale ${timeScale}`);
        baseDate = date;
        break;
    }
  }
  // Get the date ceiling
  else {
    const endDate = lastDayOfMonth(date);
    const lastDay = endDate.getDay();

    switch (timeScale) {
      case "MINUTE":
        baseDate = new Date(YEAR, MONTH, DAY, HOUR, MINUTE);
        break;
      case "HOUR":
        baseDate = new Date(YEAR, MONTH, DAY, HOUR, 59);
        break;
      case "DAY":
        baseDate = new Date(YEAR, MONTH, DAY, 23, 59);
        break;
      case "MONTH":
        baseDate = new Date(YEAR, MONTH, lastDay, 23, 59);
        break;
      case "YEAR":
        baseDate = new Date(YEAR, 11, lastDay, 23, 59);
        break;
      default:
        log({ logLevel: "error" }, `Couldn't get BaseStartDate for ${date} of timeScale ${timeScale}`);
        baseDate = date;
        break;
    }
  }

  return baseDate;
}

export { getBaseDate };
