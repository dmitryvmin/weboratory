import { TimePeriodMap } from "@components/Calendar/constants";
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns child timePeriod: DAY -> HOUR
 */
function getChildTimePeriod(timePeriod: TimePeriod): TimePeriod {
  return TimePeriodMap[TimePeriodMap.indexOf(timePeriod) + 1];
}

export { getChildTimePeriod };