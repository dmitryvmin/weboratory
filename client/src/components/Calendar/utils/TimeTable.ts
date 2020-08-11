// Libs
import {
  addMinutes,
  getDaysInMonth,
  isBefore,
} from "date-fns";

// App
import { CalendarEvent } from "@components/Calendar/types";
import { TimeScaleValues } from "@stores/CalendarStore/types";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { getIntervalData } from "@components/Calendar/utils/getIntervalData";

type TimeTableType = {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        [hour: number]: {
          [minute: number]: CalendarEvent[] | [];
        }
      }
    }
  }
}

/**
 * TimeTable Class creates a table of timeScale level for the segment of data
 */
class TimeTable {
  private timeTable: TimeTableType;

  constructor() {
    this.timeTable = {};
  }

  get timetable() {
    return this.timeTable;
  }

  createTable({
    timeScale,
    timeRangeStart,
    timeRangeEnd,
  }: {
    timeScale: TimeScaleValues;
    timeRangeStart: Date;
    timeRangeEnd: Date;
  }) {

    const startBase = getBaseDate(timeRangeStart, timeScale, "floor");
    const endBase = getBaseDate(timeRangeEnd, timeScale, "ceiling");

    // Create Timetable
    for (let d = startBase; isBefore(d, endBase); d = addMinutes(d, 1)) {
      this.addParentProps(d);
    }

    // Fill Timetable with data
    // const intervalData = getIntervalData(timeScale, startBase, endBase);
    // this.addEventsToTimetable(intervalData);
  }

  moveFoward(data, timeScale) {

  }

  moveBack(data, timeScale) {

  }

  addEventsToTimetable(data: CalendarEvent[]) {
    for (let i = 0; i < data.length; i++) {
      const event = data[i];
      const { year, month, day, hour, minute } = getMapFromDate(event.time);

      if (this.timeTable?.[year]?.[month]?.[day]?.[hour]?.[minute] === undefined) {
        return;
      }

      this.timeTable[year][month][day][hour][minute] = [
        ...this.timeTable[year][month][day][hour][minute],
        event,
      ];
    }
  }

  // Populates parent props if they are undefined
  addParentProps(date: Date) {
    const { year, month, day, hour, minute } = getMapFromDate(date);
    if (
      year !== undefined &&
      !this.timeTable?.hasOwnProperty(year)
    ) {
      this.addYear(year);
    }
    if (
      month !== undefined &&
      !this.timeTable[year]?.hasOwnProperty(month)
    ) {
      this.addMonth(date);
    }
    if (
      day !== undefined &&
      !this.timeTable[year]?.[month]?.hasOwnProperty(day)
    ) {
      this.addDay(date);
    }
    if (
      hour !== undefined &&
      !this.timeTable[year]?.[month]?.[day]?.hasOwnProperty(hour)
    ) {
      this.addHour(date);
    }
    if (
      minute !== undefined &&
      !this.timeTable[year]?.[month]?.[day]?.[hour]?.hasOwnProperty(minute)
    ) {
      this.addMinute(date);
    }
  }

  getNextTimeSegment(...args): number {
    // Identify which next timeScale segment should be looked up
    let timetableProp;

    // Iterate over the timeSegment levels
    for (let i = 0; i < args.length; i++) {
      timetableProp = this.timeTable[args[i]];
    }

    const lastTimeSegment = Object
      // Get the segments for this timeScale
      .keys(timetableProp)
      // Sort from highest to lowest
      .sort((a, b) => Number(b) - Number(a))[0];

    return parseInt(lastTimeSegment);
  }

  tagTimeScale(prop: any, tag: string) {
    if (!prop) {
      return;
    }
    const sym = Symbol();
    prop[sym] = tag;
  }

  /**
   *  Add single timeScale prop
   */
  addYear(year?: number) {
    // Use current year if year is not provided
    // this.getNextTimeSegment(year)
    const newYear = year ?? new Date().getFullYear();

    // If property already exists, return
    if (this.timeTable.hasOwnProperty(newYear)) {
      return;
    }

    this.timeTable[newYear] = {};
    this.tagTimeScale(this.timeTable[newYear], "year");
    // this.addAllMonths({ year });
  }

  addMonth(date: Date) {
    const { year, month } = getMapFromDate(date);

    // Add parent props
    if (!this.timeTable[year].hasOwnProperty(month)) {
      this.addYear();
    }

    // If month prop exists, return
    if (this.timeTable[year]?.[month]?.hasOwnProperty(month)) {
      return;
    }

    const newMonth = month ?? this.getNextTimeSegment(year);

    // TODO: Handle adding month to a new year
    if (newMonth > 12) {
      return;
    }

    // Create month property
    this.timeTable[year][month] = {};
    this.tagTimeScale(this.timeTable[year][month], "month");
    // Add days to the month
    // this.addAllDays({ year, month: newMonth });
  }

  addHour(date: Date) {
    const { year, month, day, hour } = getMapFromDate(date);

    // If hour prop exists, return
    if (this.timeTable[year]?.[month]?.[day]?.[hour]?.hasOwnProperty(hour)) {
      return;
    }

    // Create day property
    this.timeTable[year][month][day][hour] = {};
    this.tagTimeScale(this.timeTable[year][month][day][hour], "hour");

    // Add minutes to the hour
    // this.addAllMinutes({ year, month, day, hour });
  }

  addDay(date: Date) {
    const { year, month, day } = getMapFromDate(date);

    // If day prop exists, return
    if (this.timeTable[year]?.[month]?.[day]?.hasOwnProperty(day)) {
      return;
    }

    // Get the number of days to be added for this month
    const numOfDays = getDaysInMonth(new Date(year, month));

    // Create day property
    this.timeTable[year][month][day] = {};
    this.tagTimeScale(this.timeTable[year][month][day], "day");

    // Add hours to the day
    // this.addAllHours(getDateFromMap({ year, month, day }));
  }

  addMinute(date: Date) {
    const { year, month, day, hour, minute } = getMapFromDate(date);

    // If minute prop exists, return
    if (this.timeTable[year]?.[month]?.[day]?.[hour]?.[minute]?.hasOwnProperty(minute)) {
      return;
    }

    // Create minute property
    this.timeTable[year][month][day][hour][minute] = [];
    this.tagTimeScale(this.timeTable[year][month][day][hour][minute], "minute");

    // Add minutes to the hour
    // this.addAllMinutes(getDateFromMap({ year, month, day, hour }));
  }

  /**
   *  Add all timeScale props
   */
  addAllMonths(year: number) {
    // Add months to the year
    for (let i = 0; i < 12; i++) {
      this.addMonth(getDateFromMap({ year, month: i }));
    }
  }

  addAllDays(date: Date) {
    const { year, month } = getMapFromDate(date);

    // Get the number of days to be added for this month
    const numOfDays = getDaysInMonth(new Date(year, month));

    // Add days to the month
    for (let i = 0; i < numOfDays; i++) {

      // Create day property
      this.timeTable[year][month][i] = {};
      this.tagTimeScale(this.timeTable[year][month][i], "day");

      // Add hours
      this.addAllHours(getDateFromMap({ year, month, day: i }));
    }
  }

  addAllHours(date: Date) {
    const { year, month, day } = getMapFromDate(date);

    // Add hours for the day
    for (let i = 0; i < 24; i++) {

      // Create hour property
      this.timeTable[year][month][day][i] = {};
      this.tagTimeScale(this.timeTable[year][month][day][i], "hour");

      // Add minutes
      this.addAllMinutes(getDateFromMap({ year, month, day, hour: i }));
    }
  }

  addAllMinutes(date: Date) {
    const { year, month, day, hour } = getMapFromDate(date);
    // Add minutes to the hour

    for (let i = 0; i < 60; i++) {

      // Create minute property
      this.timeTable[year][month][day][hour][i] = [];
      this.tagTimeScale(this.timeTable[year][month][day][hour][i], "minute");
    }
  }
}

export { TimeTable };
