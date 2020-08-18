import { DateMap, EventsDataMap, TimePeriod } from "@components/Calendar/store/types";
import { getDaysInMonth } from "date-fns";
import { getTimePeriodIntervals } from "@components/Calendar/utils/getTimePeriodIntervals";
import { TimePeriodMap } from "@components/Calendar/constants";

function fillTimePeriod(
  eventsDataMap: EventsDataMap,
  startMap: DateMap,
  endMap: DateMap,
  tableSlot: any[],
  timePeriod: TimePeriod,
  curDateString: string,
) {

  // Get intervals for this period
  const [curYear, curMonth] = curDateString.split("-");
  let daysInPeriod;
  if (timePeriod === "DAY") {
    daysInPeriod = getDaysInMonth(new Date(Number(curYear), Number(curMonth)));
  }

  const periodIntervals = getTimePeriodIntervals({
    timePeriod,
    end: daysInPeriod,
  });

  // // Is this a new entry
  // let _tableSlot = tableSlot;
  // if (_tableSlot === null)
  // Fill in 0-day with null
  if (timePeriod === "DAY" && tableSlot[0] === undefined) {
    tableSlot[0] = 0;
  }

  for (let interval = periodIntervals.start; interval <= periodIntervals.end; interval++) {

    // Is interval within timetableMap?
    if (
      interval >= startMap[timePeriod] &&
      interval <= endMap[timePeriod]
    ) {

      // At minute timeFrame, populate the tableSlot with Events data
      if (
        TimePeriodMap.indexOf(timePeriod) === 1 &&
        tableSlot[interval] === undefined
      ) {
        const timestamp = `${curDateString}-${interval}`;
        const eventsData = eventsDataMap[timestamp] ?? null;
        tableSlot[interval] = eventsData;
      }

      // Otherwise, recurse to populate inner slots
      else {
        // Get child timePeriod: DAY -> HOUR
        const childTimePeriod = TimePeriodMap[TimePeriodMap.indexOf(timePeriod) - 1];

        // Check whether to update existing or create a new entry
        if (
          tableSlot[interval] === undefined ||
          tableSlot[interval].length
        ) {
          tableSlot[interval] = [];
        }

        fillTimePeriod(
          eventsDataMap,
          startMap,
          endMap,
          tableSlot[interval],
          childTimePeriod,
          `${curDateString}-${interval}`,
        );
      }
    }
    else if (tableSlot[interval] === undefined){
      tableSlot[interval] = null;
    }
  }
};

export {fillTimePeriod};
