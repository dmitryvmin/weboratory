import { getTimePeriodIdxFromDate } from "@components/Calendar/utils/getTimePeriodIdxFromDate";
import { TimePeriod } from "@components/Calendar/store/types";

function getSegmentIdxFromDate(
  timePeriod: TimePeriod,
  markerDate: Date,
  slideDate: Date,
): number {
  const slideIdx = getTimePeriodIdxFromDate(timePeriod, slideDate);
  const markerIdx = getTimePeriodIdxFromDate(timePeriod, markerDate);
  return slideIdx - markerIdx;
}

export { getSegmentIdxFromDate };
