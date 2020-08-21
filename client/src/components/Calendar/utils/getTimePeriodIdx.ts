import { TimePeriodMap } from "@components/Calendar/constants";
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns timePeriod index
 */
function getTimePeriodIdx(timeScale: TimePeriod): number {
  return TimePeriodMap.indexOf(timeScale);
}

export { getTimePeriodIdx };
