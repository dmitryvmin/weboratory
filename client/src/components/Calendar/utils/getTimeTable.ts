// Libs
import { getDaysInMonth } from "date-fns";
import { log } from "@dmitrymin/fe-log";

// App
import { CalendarEvent } from "@components/Calendar/types";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { EventsDataMap } from "@components/Calendar/utils/getEventsAtTimeScaleForInterval";
import { getTimePeriodIntervals } from "@components/Calendar/utils/getTimePeriodIntervals";

import { TimePeriod } from "@stores/CalendarStore/types";
import { TimePeriodMap } from "@stores/CalendarStore";

type TimeTablePropTypes = YearPropType | MonthPropType | DayPropType | HourPropType | MinutePropType;
type MinutePropType = CalendarEvent[] | undefined;
type HourPropType = MinutePropType[] | undefined;
type DayPropType = HourPropType[] | undefined | null;
type MonthPropType = DayPropType[] | undefined;
type YearPropType = MonthPropType[] | undefined;

type IntervalType = {
  start: number;
  end: number;
}

type TimeTable = {
  [year: number]: YearPropType;
}

type TimeTableUpdateArgs = {
  // selectedTimePeriod: TimePeriod;
  timeTableFloor: Date;
  timeTableCeiling: Date;
  eventsDataMap: EventsDataMap;
  timeTable?: TimeTable;
}

/**
 * TimeTable object:
 * - year objects are stored as objects so allow look up by key
 * - months are 0-indexed arrays to preserve months order
 * - days are stored as a 1-indexed arrays to make up for the JS's inherited
 * and inconvenient Date indexing: month[0] is filled with null
 * - hours & minutes are 0-indexed arrays
 */
function getTimeTable({
  eventsDataMap,
  timeTableFloor,
  timeTableCeiling,
  timeTable,
}: TimeTableUpdateArgs): TimeTable {

  const _timeTable: TimeTable = timeTable ?? {};
  const startMap = getMapFromDate(timeTableFloor);
  const endMap = getMapFromDate(timeTableCeiling);

  function mapOverPeriod(
    timePeriod: TimePeriod,
    periodIntervals: IntervalType,
    curDateString,
  ): TimeTablePropTypes {

    const table: TimeTablePropTypes = [];

    // Fill in 0-day with null
    if (timePeriod === "DAY") {
      table[0] = null;
    }

    for (let interval = periodIntervals.start; interval <= periodIntervals.end; interval++) {

      // Is interval within timetableMap?
      if (
        interval >= startMap[timePeriod] &&
        interval <= endMap[timePeriod]
      ) {
        if (timePeriod === TimePeriodMap[1]) {
          const timestamp = `${curDateString}-${interval}`;
          table[interval] = eventsDataMap[timestamp];
        }
        else {

          table[interval] = [];
          const subLevelTimeScale = TimePeriodMap[TimePeriodMap.indexOf(timePeriod) - 1];

          const numOfDays = (subLevelTimeScale === "DAY")
            ? getDaysInMonth(new Date(curDateString.split("-")[0], interval))
            : undefined;

          const timePeriodIntervals = getTimePeriodIntervals({
            timeScale: subLevelTimeScale,
            end: numOfDays,
          });

          table[interval] = (mapOverPeriod(
            subLevelTimeScale,
            timePeriodIntervals,
            `${curDateString}-${interval}`,
          ) as MonthPropType | DayPropType | HourPropType);
        }
      }
      else {
        table[interval] = undefined;
      }
    }

    return table;
  };

  function mapOverYears(timeTable: TimeTable) {
    for (let year = startMap["YEAR"]; year <= endMap["YEAR"]; year++) {
      const timePeriodIntervals = getTimePeriodIntervals({ timeScale: "MONTH" });
      timeTable[year] = mapOverPeriod("MONTH", timePeriodIntervals, `${year}`) as YearPropType;
    }
  }

  mapOverYears(_timeTable);
  log("Timetable", _timeTable);

  return _timeTable;
};

export { getTimeTable };