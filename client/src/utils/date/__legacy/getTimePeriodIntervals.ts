// Libs
import { log } from "@dmitrymin/fe-log";

// App
import { IntervalType, TimePeriod } from "@components/Calendar/common/types";

type GetTimePeriodIntervalsProps = {
  timePeriod: TimePeriod;
  start?: number;
  end?: number;
}

/**
 * Returns child timePeriod intervals for a timePeriod
 */
const getTimePeriodIntervals = ({
  timePeriod,
  start,
  end,
}: GetTimePeriodIntervalsProps): IntervalType => {
  switch (timePeriod) {
    case "MINUTE":
      return { start: 0, end: 59 };
    case "HOUR":
      return { start: 0, end: 23 };
    case "DAY":
      if (!end) {
        log({ logLevel: "warn" }, "To get day intervals, the length of the month needs to be provided.");
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

export { getTimePeriodIntervals };