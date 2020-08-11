import {
  getYear,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
} from "date-fns";

/**
 * Returns a timeMarker of [timeScale] duration starting at current time
 */
function getMapFromDate(date: Date) {
  const dateMap = ({
    year: getYear(date),
    month: getMonth(date),
    day: getDate(date),
    hour: getHours(date),
    minute: getMinutes(date),
    // second: getSeconds(date),
  });

  return dateMap;
}

export { getMapFromDate };