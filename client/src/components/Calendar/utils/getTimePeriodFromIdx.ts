import { TimePeriodMap } from "@components/Calendar/constants";
import { TimePeriod } from "@components/Calendar/common/types";

/**
 * Returns a timePeriod from idx, incremented/decremented by [adjustBy]
 */
function getTimePeriodFromIdx(
  timePeriod: TimePeriod,
  adjustBy = 0,
): TimePeriod {

  const curTimeScaleIdx = TimePeriodMap.indexOf(timePeriod);
  const newTimeScaleIdx = curTimeScaleIdx + adjustBy;

  return TimePeriodMap[newTimeScaleIdx];
}

export { getTimePeriodFromIdx };
