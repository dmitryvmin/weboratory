import { EventsDataMap } from "@components/Calendar/common/types";
import { TimeTable } from "@components/Calendar/hooks/useTimeTable/TimeTable";
import { getEventsForTimePeriodInterval } from "@components/Calendar/utils/getEventsForTimePeriodInterval";

function getIntervalEventsDataMap(
  calendarTimePeriod,
  calendarDate,
  visibleSlideCount,
  eventsData
): EventsDataMap {

  const { floorDate, ceilingDate } = TimeTable.getTimeTableDates({
    calendarTimePeriod,
    calendarDate,
    visibleSlideCount,
  });

  const eventsDataMap = getEventsForTimePeriodInterval({
    timePeriod: calendarTimePeriod,
    intervalStart: floorDate,
    intervalEnd: ceilingDate,
    eventsData,
  });

  return eventsDataMap;
}

export {getIntervalEventsDataMap};