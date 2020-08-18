// Libs
import { getDaysInMonth, getTime } from "date-fns";

// App
import { TimePeriod } from "@components/Calendar/store/types";

function formatTimestampToScale(
  timeScale: TimePeriod,
  date: Date,
): number {

  const timestamp = getTime(date);
  const daysInMonth = getDaysInMonth(date);

  switch (timeScale) {
    case "MINUTE":
    default:
      return Math.floor(timestamp / (60 * 1000));
    case "HOUR":
      return Math.floor(timestamp / (60 * 60 * 1000));
    case "DAY":
      return Math.floor(timestamp / (24 * 60 * 60 * 1000));
    case "MONTH":
      return Math.floor(timestamp / (daysInMonth * 24 * 60 * 60 * 1000));
    case "YEAR":
      return Math.floor(timestamp / (12 * daysInMonth * 24 * 60 * 60 * 1000));
  }
}

export {formatTimestampToScale};
