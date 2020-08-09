// Libs
import { getDaysInMonth, getMonth, getYear, getDay } from "date-fns";

class TimeTable {

  initTimeTable() {

    const currentYear = new Date().getFullYear();

    const timeTable = {
      [currentYear]: {},
    };

    this.addAllMonths(timeTable);

    return timeTable;
  };

  addAllMonths(timetable) {
    for (let i = 0; i < 12; i++) {
      const thisMonth = i + 1;
      this.addMonth({
        timetable,
        time: new Date(),
        month: thisMonth,
      });
    }
    return timetable;
  }

  addMonth({
    timetable,
    time,
    year = getYear(time),
    month = parseInt(Object.keys(timetable[year]).sort((a, b) => Number(b) - Number(a))[0]) + 1,
  }: {
    timetable: any;
    time: Date;
    month?: number;
    year?: number;
  }) {

    if (Number(month) > 12) {
      return;
    }

    timetable[year][month] = {};
    this.addAllDays({ timetable, year, month });

    return timetable;
  }

  subMonth() {
  }

  addDay() {
  }

  subDay() {
  }

  addAllDays({
    timetable,
    month,
    year,
  }: {
    timetable: any;
    month: number;
    year: number;
  }) {

    const days = getDaysInMonth(new Date(`${year}-${month}`));

    for (let i = 0; i < days; i++) {

      const thisDay = (i + 1);

      timetable[year][month][thisDay] = {};

      this.addAllHours({ timetable, year, month, day: thisDay });
    }

    return timetable;
  }

  addAllHours({
    timetable,
    day,
    month,
    year,
  }: {
    timetable: any;
    day: number,
    month: number;
    year: number;
  }) {

    for (let i = 0; i < 24; i++) {

      const thisHour = i + 1;

      timetable[year][month][day][thisHour] = {};

      this.addAllMinutes({
        timetable,
        year,
        month,
        day,
        hour: thisHour,
      });
    }

    return timetable;
  }

  addAllMinutes({
    timetable,
    year,
    month,
    day,
    hour,
  }: {
    timetable: any;
    year: number;
    month: number;
    day: number;
    hour: number;
  }) {

    for (let i = 0; i < 60; i++) {

      const thisMinute = i + 1;

      timetable[year][month][day][hour][thisMinute] = thisMinute;
    }

    return timetable;
  }

}

export { TimeTable };
