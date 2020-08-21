import { TimePeriod } from "@components/Calendar/common/types";
import { getTimePeriodIdxFromDate } from "@components/Calendar/utils/getTimePeriodIdxFromDate";

/**
 * Returns the index of the slide
 */
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
