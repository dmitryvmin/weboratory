import { TimePeriod } from "@stores/CalendarStore/types";
import { TimePeriodMap } from "@stores/CalendarStore";

function getTimeScaleFrom(
  timeScale: TimePeriod,
  increment: number,
): TimePeriod {

  const curTimeScaleIdx = TimePeriodMap.indexOf(timeScale);
  const newTimeScaleIdx = curTimeScaleIdx + increment;

  return TimePeriodMap[newTimeScaleIdx];
}

export {getTimeScaleFrom};