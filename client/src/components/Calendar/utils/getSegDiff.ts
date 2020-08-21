// Libs
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

// App
import { TimePeriod } from "@components/Calendar/common/types";

type GetSegmentDifferenceProps = {
  timePeriod: TimePeriod;
  from: Date;
  to: Date;
};

/**
 * Return segment difference between two dates.
 * Negative number implies x-hours earlier.
 */
function getSegDiff({
  timePeriod,
  from,
  to,
}: GetSegmentDifferenceProps): number {
  switch (timePeriod) {
    case "MINUTE":
      return differenceInMinutes(from, to);
    case "HOUR":
      return differenceInHours(from, to);
    case "DAY":
      return differenceInDays(from, to);
    case "MONTH":
      return differenceInMonths(from, to);
    case "YEAR":
    default:
      return differenceInYears(from, to);
  }
}

export { getSegDiff };
