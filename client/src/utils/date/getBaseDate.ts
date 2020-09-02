// Libs
import { getDaysInMonth, lastDayOfMonth } from "date-fns";
import { log } from "@dmitrymin/fe-log";

// App
import { TimePeriod } from "@components/Calendar/common/types";
import { getMapFromDate } from "@utils/date/getMapFromDate";

/**
 * Return a date which start at the [date]'s [timeScale]
 * with all the base timeScales beginning at 0
 */
function getBaseDate(
  date: Date,
  timePeriod: TimePeriod,
  direction: "floor" | "ceiling",
): Date {

  const { YEAR, MONTH, DAY, HOUR, MINUTE } = getMapFromDate(date);
  let baseDate;

  if (direction === "floor") {
    switch (timePeriod) {
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
        log({ logLevel: "error" }, `Couldn't get BaseStartDate for ${date} of timeScale ${timePeriod}`);
        baseDate = date;
        break;
    }
  }
  // Get the date ceiling
  else {
    const daysInMonth = getDaysInMonth(date);

    switch (timePeriod) {
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
        baseDate = new Date(YEAR, MONTH, daysInMonth, 23, 59);
        break;
      case "YEAR":
        baseDate = new Date(YEAR, 11, daysInMonth, 23, 59);
        break;
      default:
        log({ logLevel: "error" }, `Couldn't get BaseStartDate for ${date} of timeScale ${timePeriod}`);
        baseDate = date;
        break;
    }
  }

  return baseDate;
}

export { getBaseDate };
