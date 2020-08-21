// Libs
import { getDaysInMonth, getYear } from "date-fns";

// App
import { TimePeriod, SegmentInterval } from "@components/Calendar/common/types";

/**
 * Returns [timeScale] segments
 */
function getIntervalsForSegment(
  timePeriod: TimePeriod,
  date: Date,
): SegmentInterval {
  switch (timePeriod) {
    case "SECOND":
      return {
        start: 0,
        end: 59,
      };
    case "MINUTE":
      return {
        start: 0,
        end: 59,
      };
    case "HOUR":
      return {
        start: 0,
        end: 23,
      };
    case "DAY":
      return {
        start: 1,
        end: getDaysInMonth(date),
      };
    case "MONTH":
      return {
        start: 0,
        end: 11,
      };
    default:
      return {
        start: getYear(date),
        end: getYear(date),
      };
  }
}

export { getIntervalsForSegment };
