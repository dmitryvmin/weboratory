import { TimeTableIntervalCollectionType } from "@components/Calendar/utils/TimeTable/types";
import { getEventsDataForTimeTableInterval } from "@components/Calendar/utils/getEventsDataForTimeTableInterval";
import { mockEventsData } from "@components/Calendar/__mocks__/mockEventsData";

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