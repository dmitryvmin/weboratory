import { TimePeriodMap } from "@components/Calendar/constants";
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns parent timePeriod: DAY -> MONTH
 */
function getParentTimePeriod(timePeriod: TimePeriod): TimePeriod {
  return TimePeriodMap[TimePeriodMap.indexOf(timePeriod) - 1];
}

export { getParentTimePeriod };