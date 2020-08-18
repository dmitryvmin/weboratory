// Libs
import { log } from "@dmitrymin/fe-log";

// App
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { CalendarEvent, EventsDataMap } from "@components/Calendar/store/types";
import { fillTimePeriod } from "@components/Calendar/utils/useTimeTable/fillTimePeriod";

type MinutePropType = CalendarEvent[] | null;
type HourPropType = (MinutePropType | null)[];
type DayPropType = (HourPropType | null | 0)[];
type MonthPropType = (DayPropType | null)[];
type YearPropType = (MonthPropType | null)[];
type PeriodPropType = MonthPropType | DayPropType | HourPropType | MinutePropType;

type TimeTableUpdateArgs = {
  // selectedTimePeriod: TimePeriod;
  timeTableFloor: Date;
  timeTableCeiling: Date;
  eventsDataMap: EventsDataMap;
  timeTable?: TimeTable;
}

export type TimeTable = {
  [year: number]: YearPropType;
}

/**
 * TimeTable Class:
 * - year objects are stored as objects so allow look up by key
 * - months are 0-indexed arrays to preserve months order
 * - days are stored as a 1-indexed arrays to make up for the JS's inherited
 * and inconvenient Date indexing: month[0] is filled with null
 * - hours & minutes are 0-indexed arrays and contain Event data
 */
function createTimeTable({
  eventsDataMap,
  timeTableFloor,
  timeTableCeiling,
  timeTable,
}: TimeTableUpdateArgs): TimeTable {

  const _timeTable: TimeTable = timeTable ?? {};
  const startMap = getMapFromDate(timeTableFloor);
  const endMap = getMapFromDate(timeTableCeiling);

  function mapOverYears(timeTable: TimeTable) {
    for (let year = startMap["YEAR"]; year <= endMap["YEAR"]; year++) {
      if (
        timeTable[year] === undefined ||
        !timeTable[year].length
      ) {
        timeTable[year] = [];
      }

      fillTimePeriod(
        eventsDataMap,
        startMap,
        endMap,
        timeTable[year],
        "MONTH",
        `${year}`,
      );
    }
  }

  mapOverYears(_timeTable);
  // log("Timetable", _timeTable);

  return _timeTable;
};

export { createTimeTable };