// Libs
import { getDay } from "date-fns";

// App
import { DateMap, EventsDataMap, TimePeriod } from "@components/Calendar/store/types";
import { TimeTable } from "@components/Calendar/utils/useTimeTable/createTimeTable";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { fillTimePeriod } from "@components/Calendar/utils/useTimeTable/fillTimePeriod";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { TimePeriodMap } from "@components/Calendar/constants";

type UpdateTimeTableProps = {
  eventsDataMap: EventsDataMap;
  timeTable: TimeTable;
  timePeriod: TimePeriod;
  calendarMarker: Date;
  delta: number;
}

function updateTimeTable({
  eventsDataMap,
  timeTable,
  timePeriod,
  calendarMarker,
  delta,
}: UpdateTimeTableProps): TimeTable {

  const timeRangeStart = (delta < 0) ? getTimestamp(calendarMarker, timePeriod, delta) : calendarMarker;
  const timeRangeEnd = (delta > 0) ? getTimestamp(calendarMarker, timePeriod, delta) : calendarMarker;

  const timeTableFloor = getBaseDate(timeRangeStart, timePeriod, "floor");
  const timeTableCeiling = getBaseDate(timeRangeEnd, timePeriod, "ceiling");

  const startMap = getMapFromDate(timeTableFloor);
  const endMap = getMapFromDate(timeTableCeiling);

  const { YEAR, MONTH, DAY, HOUR } = startMap;
  // const timeTableFloor = getBaseDate(calendarMarker, timePeriod, "floor");

  if (DAY === undefined) {
    debugger;
    return timeTable;
  }

  if (!timeTable[YEAR]) {
    timeTable[YEAR] = [];
  }

  if (!timeTable[YEAR][MONTH]) {
    timeTable[YEAR][MONTH] = [];
  }

  if (!(timeTable as any)[YEAR][MONTH][DAY]) {
    (timeTable as any)[YEAR][MONTH][DAY] = [];
  }

  const childTimePeriod = TimePeriodMap[TimePeriodMap.indexOf(timePeriod) - 1];
  fillTimePeriod(
    eventsDataMap,
    startMap,
    endMap,
    (timeTable as any)[YEAR][MONTH][DAY],
    childTimePeriod,
    `${YEAR}-${MONTH}-${DAY}`,
  );

  // switch (timePeriod) {
  //   case "MINUTE":
  //     break;
  //   case "HOUR":
  //     break;
  //   case "DAY":
  //     break;
  //   case "MONTH":
  //     break;
  //   case "YEAR":
  //   default:
  //     break;
  // }

  return timeTable;
}

export { updateTimeTable };
