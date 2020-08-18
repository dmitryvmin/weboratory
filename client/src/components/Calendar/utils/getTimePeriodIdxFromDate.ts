import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";
import { TimePeriod } from "@components/Calendar/store/types";

function getTimePeriodIdxFromDate(
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

export { getTimePeriodIdxFromDate };