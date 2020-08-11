// Libs
import { log } from "@dmitrymin/fe-log";

// App
import { TimeScaleValues } from "@stores/CalendarStore/types";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";

/**
 * Return a date which start at the [date]'s [timeScale]
 * with all the base timeScales beginning at 0
 */
function getBaseDate(
  date: Date,
  timeScale: TimeScaleValues,
  direction: "floor" | "ceiling",
  ): Date {

  let _date: Date;

  if (direction === "floor") {
    _date = date;
  }
  else {
    // Bump the date by 1 so we're getting the ceiling of the date (sort of)
    _date = getTimestamp(date, timeScale, 1);
  }

  const dateMap = getMapFromDate(_date);
  const { year, month, day, hour, minute } = dateMap;

  switch (timeScale) {
    case "MINUTE":
      return getDateFromMap({ year, month, day, hour, minute });
    case "HOUR":
      return getDateFromMap({ year, month, day, hour, minute: 0 });
    case "DAY":
      return getDateFromMap({ year, month, day, hour: 0,  minute: 0 });
    case "MONTH":
      return getDateFromMap({ year, month, day: 0, hour: 0, minute: 0 });
    case "YEAR":
      return getDateFromMap({ year, month: 0, day: 0, hour: 0, minute: 0 });
    default:
      log(`Couldn't get BaseStartDate for ${date} of timeScale ${timeScale}`);
      return date;
  }
}

export { getBaseDate };
