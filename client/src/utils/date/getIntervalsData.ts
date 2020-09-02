// Utils
import { getEventsDataForTimeTableInterval } from "@utils/date/getEventsDataForTimeTableInterval";

// Types
import { TimeTableIntervalCollectionType } from "@stores/globalStore/stores/timetable/types";

// Mock data
import { mockEventsData } from "@components/Calendar/__mocks__/mockEventsData";

/**
 * Returns a nested object property
 */
export function getIntervalsData(
  timeTableIntervals: TimeTableIntervalCollectionType,
  calTimePeriod
  ) {
  const intervalsData: any = [];

  for (const i in timeTableIntervals) {

    const thisInterval = timeTableIntervals[i];
    const intervalData = getEventsDataForTimeTableInterval({
      eventsData: mockEventsData,
      intervalStart: thisInterval.start,
      intervalEnd: thisInterval.end,
      formattedBy: calTimePeriod
    });

    intervalsData.push({
      ...thisInterval,
      ...intervalData
    });
  }

  return intervalsData;
}