// Libs
import {
  getYear,
  getDate,
  getHours,
  getMinutes,
  getMonth,
} from "date-fns";

// App
import { DateMap } from "@components/Calendar/common/types";

/**
 * Returns a timeMarker of [timeScale] duration starting at current time
 */
function getMapFromDate(date: Date): DateMap {
  const dateMap = ({
    YEAR: getYear(date),
    MONTH: getMonth(date),
    DAY: getDate(date),
    HOUR: getHours(date),
    MINUTE: getMinutes(date),
  });

  return dateMap;
}

export { getMapFromDate };