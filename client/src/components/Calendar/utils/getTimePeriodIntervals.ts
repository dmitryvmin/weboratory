import { TimePeriod } from "@stores/CalendarStore/types";
import { log } from "@dmitrymin/fe-log";

const getTimePeriodIntervals = ({
  timeScale,
  start,
  end,
}: {
  timeScale: TimePeriod;
  start?: number;
  end?: number
}): {
  start: number;
  end: number;
} => {
  switch (timeScale) {
    case "MINUTE":
      return { start: 0, end: 59 };
    case "HOUR":
      return { start: 0, end: 23 };
    case "DAY":
      if (!end) {
        log({logLevel: "warn"}, "To get day intervals, the length of the month needs to be provided.");
        return { start: 1, end: 1 };
      }
      return { start: 1, end };
    case "MONTH":
      return { start: 0, end: 11 };
    case "YEAR":
    default:
      return { start: 1, end: 1 };
  }
};

export {getTimePeriodIntervals};
