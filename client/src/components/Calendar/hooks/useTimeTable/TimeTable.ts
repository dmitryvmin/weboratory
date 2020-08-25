// Utils
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { getIntervalsForSegment } from "@components/Calendar/utils/getIntervalsForSegment";
import { getTimePeriodIdx } from "@components/Calendar/utils/getTimePeriodIdx";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";
import { getSegmentIdxFromDate } from "@components/Calendar/utils/getSegmentIdxFromDate";
import { setToPath } from "@components/Calendar/hooks/useTimeTable/utils/setToPath";

// Constants
import { SLIDER_BUFFER, TimePeriodMap } from "@components/Calendar/constants";

// Types
import {
  CreateTimeTableProps,
  FillIntervalProps,
  GetTimeTableDatesProps,
  TimeTableDatesType,
  GetTimeTableMapsProps,
  TimeTableMapsType, FillTimeTableProps, FillWholeProps, TimeTableType,
} from "@components/Calendar/hooks/useTimeTable/types";
import { isWithinInterval } from "date-fns";

/**
 * TimeTable Class:
 *
 * DataStruct:
 * - YEAR objects are stored as objects to allow look up by key
 * - MONTHs, DAYs, HOURs, and MINUTEs are stored as indexed arrays with indices providing the segment count
 * - MONTHs are 0-indexed arrays to preserve months order
 * - DAYs are stored as a 1-indexed arrays to make up for the JS's inherited Date indexing
 * - HOURs & MINUTEs are 0-indexed arrays and contain Event data
 */
class TimeTable {

  /**
   * Dates Utility
   */
  public static getTimeTableDates({
    calendarDate,
    calendarTimePeriod,
    visibleSlideCount = 1,
  }: GetTimeTableDatesProps): TimeTableDatesType {

    const timeRangeStart = getDateAdjustedBy(calendarDate, calendarTimePeriod, -SLIDER_BUFFER);
    const timeRangeEnd = getDateAdjustedBy(calendarDate, calendarTimePeriod, (visibleSlideCount - 1) + SLIDER_BUFFER);
    const timeTableFloorDate = getBaseDate(timeRangeStart, calendarTimePeriod, "floor");
    const timeTableCeilingDate = getBaseDate(timeRangeEnd, calendarTimePeriod, "ceiling");

    return ({
      curDate: calendarDate,
      floorDate: timeTableFloorDate,
      ceilingDate: timeTableCeilingDate,
    });
  }

  /**
   * DateMap Utility
   */
  public static getTimeTableMaps({
    curDate,
    floorDate,
    ceilingDate,
  }: GetTimeTableMapsProps): TimeTableMapsType {

    const curDateMap = getMapFromDate(curDate);
    const startDateMap = getMapFromDate(floorDate);
    const endDateMap = getMapFromDate(ceilingDate);

    return ({
      curDateMap,
      startDateMap,
      endDateMap,
    });
  }

  /**
   * Fills interval, iterating over TimePeriodMap left -> right
   */
  public static fillInterval({
    calendarTimePeriod,
    timeTableDates,
    intervalTimePeriod,
    intervalStart,
    intervalEnd,
  }: FillIntervalProps) {

    const calendarTimePeriodIdx = getTimePeriodIdx(calendarTimePeriod);
    const intervalTimePeriodIdx = getTimePeriodIdx(intervalTimePeriod);

    // const calendarChildTimePeriod = getChildTimePeriod(calendarTimePeriod);
    // Fill current timePeriod
    const intervalArray = this.segmentInterval({
      calendarTimePeriod,
      timePeriod: intervalTimePeriod,
      date: intervalStart,
    });

    let curDate = intervalStart;

    // Loop over interval, incrementing curDate by one intervalTimePeriod value
    while (curDate.getTime() <= intervalEnd.getTime()) {

      const newFieldKey = getSegmentIdxFromDate(intervalTimePeriod, curDate);
      const childTimePeriod = getChildTimePeriod(intervalTimePeriod);

      // ===== Path 1:
      // If current interval timePeriod is higher than the calendar timePeriod (MONTH > DAY),
      // recurse over the child timeperiod intervals
      if (intervalTimePeriodIdx < calendarTimePeriodIdx) {

        const childIntervalStart = getBaseDate(curDate, intervalTimePeriod, "floor");
        const childIntervalEnd = getBaseDate(curDate, intervalTimePeriod, "ceiling");

        // Recurse
        const table = this.fillInterval({
          calendarTimePeriod,
          timeTableDates,
          intervalTimePeriod: childTimePeriod,
          intervalStart: childIntervalStart,
          intervalEnd: childIntervalEnd,
        });

        // Save the result
        setToPath(intervalArray, [newFieldKey], table);
      }

      // ===== Path 2:
      // If current interval is at the calendar's period level,
      // check it falls within timetable's floor/ceiling date range.
      // If it does, fill in the child time period segments.
      if (intervalTimePeriodIdx === calendarTimePeriodIdx) {

        // Check if within timetable interval
        const isCurrentIntervalWithin = isWithinInterval(
          curDate,
          {
            start: timeTableDates.floorDate,
            end: timeTableDates.ceilingDate,
          },
        );

        // If it is...
        if (isCurrentIntervalWithin) {

          // ...segment the interval
          const newFieldValue = this.segmentInterval({
            calendarTimePeriod,
            timePeriod: childTimePeriod,
            date: curDate,
          });

          // ...and save the result
          setToPath(intervalArray, [newFieldKey], newFieldValue);
        }
      }

      curDate = getDateAdjustedBy(curDate, intervalTimePeriod, 1);
    }

    return intervalArray;
  }

  /**
   * Returns an array of indexed segments for a timePeriod
   */
  public static segmentInterval({
    calendarTimePeriod,
    timePeriod,
    date,
  }: FillWholeProps) {

    // YEARS are stored as objects
    // Other timePeriods are stored as arrays
    let table;
    if (timePeriod === "YEAR") {
      table = {};
    }
    else {
      table = [];
    }

    // Since JS's Date enumerates days starting at 1, fill in 0-index
    // to avoid having an empty slot in the array
    if (timePeriod === "DAY") {
      table[0] = 0;
    }

    const calendarChildTimePeriod = getChildTimePeriod(calendarTimePeriod);
    const insideCalendarTimePeriod = timePeriod === calendarChildTimePeriod;

    // Get interval segments and create an array from them
    const { start, end } = getIntervalsForSegment(timePeriod, date);

    for (let segment = start; segment <= end; segment++) {
      table[segment] = insideCalendarTimePeriod ? null : undefined;
    }

    return table;
  }

  /**
   * Fills out the timeTable looping over the TimePeriodMap left -> right.
   * Directs flow to fill out intervals once startMap and endMap diverge.
   */
  public static fillTimeTable({
    timeTable,
    timeTableDates,
    timeTableMaps,
    calendarTimePeriod,
  }: FillTimeTableProps): TimeTableType {

    const { curDateMap, startDateMap, endDateMap } = timeTableMaps;
    const { curDate, floorDate, ceilingDate } = timeTableDates;

    // Keeps track of the timeTable property being updated
    const timeTablePath: number[] = [];

    // Loop over timePeriods inwards YEAR -> MINUTE
    for (let i = 0; i < TimePeriodMap.length; i++) {

      const thisTimePeriod = TimePeriodMap[i];
      const childTimePeriod = getChildTimePeriod(thisTimePeriod);

      // If in current timePeriod, fill in the entire object
      // since FE will be mapping over the current timePeriod
      if (startDateMap[thisTimePeriod] === endDateMap[thisTimePeriod]) {

        const thisTimePeriodKey = curDateMap[thisTimePeriod];
        timeTablePath.push(thisTimePeriodKey);

        const table = this.segmentInterval({
          calendarTimePeriod,
          timePeriod: childTimePeriod,
          date: curDate,
        });

        setToPath(timeTable, timeTablePath, table);
      }
      // Otherwise, handle this as an interval...
      else {

        // ...and fill in segments for the floor/ceiling range
        const table = this.fillInterval({
          calendarTimePeriod,
          timeTableDates,
          intervalTimePeriod: thisTimePeriod,
          intervalStart: getBaseDate(floorDate, thisTimePeriod, "floor"),
          intervalEnd: getBaseDate(ceilingDate, thisTimePeriod, "ceiling"),
        });

        // fillInterval will recurse over the timePeriod intervals
        // so set its return and exit this loop
        if (calendarTimePeriod === "YEAR") {
          return table;
        }
        else {
          setToPath(timeTable, timeTablePath, table);
        }
        break;
      }
    }

    return timeTable;
  }

  public static createTimeTable({
    calendarDate,
    calendarTimePeriod,
    timeTable,
    visibleSlideCount = 1,
  }: CreateTimeTableProps): TimeTableType {

    // Get timeTable props
    const timeTableDates = this.getTimeTableDates({ calendarDate, calendarTimePeriod, visibleSlideCount });
    const timeTableMaps = this.getTimeTableMaps(timeTableDates);

    // Fill out the table
    const _timeTable = this.fillTimeTable({
      calendarTimePeriod,
      timeTableDates,
      timeTableMaps,
      timeTable: timeTable ?? {},
    });

    console.log(
      "@@ TimeTable",
      // timeTableDates,
      // timeTableMaps,
      _timeTable,
    );

    return _timeTable;
  }

}

export { TimeTable };