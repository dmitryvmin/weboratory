import { TimeTable } from "@components/Calendar/hooks/useTimeTable/TimeTable";
import {
  getEventsForTimePeriodInterval,
  MockEventsDataType,
} from "@components/Calendar/utils/getEventsForTimePeriodInterval";
import { CalendarEvent, TimePeriod } from "@components/Calendar/common/types";

type GetIntervalEventsDataMapProps = {
  calTimePeriod: TimePeriod;
  calDate: Date;
  visibleSlideCount?: number;
  bufferSlideCount?: number;
  eventsData: CalendarEvent[];
}

function getIntervalEventsDataMap({
  calTimePeriod,
  calDate,
  visibleSlideCount,
  bufferSlideCount,
  eventsData,
}: GetIntervalEventsDataMapProps): MockEventsDataType {

  const { floorDate, ceilingDate } = TimeTable.getTimeTableDates({
    calTimePeriod,
    calDate,
    visibleSlideCount,
    bufferSlideCount,
  });

  return getEventsForTimePeriodInterval({
    timePeriod: calTimePeriod,
    intervalStart: floorDate,
    intervalEnd: ceilingDate,
    eventsData,
  });
}

export { getIntervalEventsDataMap };