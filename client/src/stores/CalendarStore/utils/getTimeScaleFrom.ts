import { TimeScaleValues } from "@stores/CalendarStore/types";
import { TimeScaleMap } from "@stores/CalendarStore";

function getTimeScaleFrom(
  timeScale: TimeScaleValues,
  increment: number,
): TimeScaleValues {

  const curTimeScaleIdx = TimeScaleMap.indexOf(timeScale);
  const newTimeScaleIdx = curTimeScaleIdx + increment;

  return TimeScaleMap[newTimeScaleIdx];
}

export {getTimeScaleFrom};