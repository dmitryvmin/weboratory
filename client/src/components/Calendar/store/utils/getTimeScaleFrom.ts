import { TimePeriod } from "@components/Calendar/store/types";
import { TimePeriodMap } from "@components/Calendar/constants";

function getTimeScaleFrom(
  timeScale: TimePeriod,
  increment: number,
): TimePeriod {

  const curTimeScaleIdx = TimePeriodMap.indexOf(timeScale);
  const newTimeScaleIdx = curTimeScaleIdx + increment;

  return TimePeriodMap[newTimeScaleIdx];
}

export {getTimeScaleFrom};