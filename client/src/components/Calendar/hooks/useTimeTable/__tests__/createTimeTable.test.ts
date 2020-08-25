// Libs
import { getDaysInMonth } from "date-fns";

// Calendar hooks
import { TimeTable } from "@components/Calendar/hooks/useTimeTable/TimeTable";
import { getFromPath } from "@components/Calendar/hooks/useTimeTable/utils/getFromPath";

// Types
import { timePeriodTestCases } from "@components/Calendar/hooks/useTimeTable/__mocks__/timePeriodTestCases";

describe("TimeTable class test", () => {

  for (let i = 0; i < timePeriodTestCases.length; i++) {

    const { timePeriod, dateMaps, path } = timePeriodTestCases[i];
    const { curDate, prevDate, nextDate, inactivePrevDate, inactiveNextDate } = dateMaps;

    it(`should generate a timeTable data structure for the ${timePeriod} timePeriod.`, () => {

      // given
      const timeTable = TimeTable.createTimeTable({
        calendarDate: dateMaps.curDate.floor!,
        calendarTimePeriod: timePeriod,
        visibleSlideCount: 1,
      });

      // expect
      if (timePeriod === "YEAR") {
        // ...current Year to be mapped correctly
        expect(timeTable[curDate.map.YEAR.toString()]).toHaveLength(12);

        //...active slide to have correct length and number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p]))[1])
          .toBe(null);

        // ...left buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p]))[1])
          .toBe(null);

        // ...right buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p]))[1])
          .toBe(null);
      }

      else if (timePeriod === "MONTH"){
        // ...current Year to be mapped correctly
        expect(Object.keys(timeTable)[0]).toBe(curDate.map.YEAR.toString());
        expect(timeTable[curDate.map.YEAR]).toHaveLength(12);

        // ...active slide to have correct length and number of timePeriod segments
        // Month array has a length of [0, number of days]
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p])))
          .toHaveLength(getDaysInMonth(curDate.date) + 1);
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p]))[0])
          .toBe(0);
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p]))[1])
          .toBe(null);

        // ...left buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p])))
          .toHaveLength(getDaysInMonth(prevDate.date) + 1);
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p]))[0])
          .toBe(0);
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p]))[1])
          .toBe(null);

        // ...right buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p])))
          .toHaveLength(getDaysInMonth(nextDate.date) + 1);
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p]))[0])
          .toBe(0);
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p]))[1])
          .toBe(null);

        // ...inactive segments to have a value of undefined
        expect(getFromPath(timeTable, path.map((p) => inactivePrevDate.map[p])))
          .toBe(undefined);
        expect(getFromPath(timeTable, path.map((p) => inactiveNextDate.map[p])))
          .toBe(undefined);
      }

      else if (timePeriod === "DAY") {
        // ...current Year to be mapped correctly
        expect(Object.keys(timeTable)[0]).toBe(curDate.map.YEAR.toString());
        expect(timeTable[curDate.map.YEAR]).toHaveLength(12);

        // ...active slide to have correct length and number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p])))
          .toHaveLength(24);
        expect(getFromPath(timeTable, path.map((p) => curDate.map[p]))[1])
          .toBe(null);

        // ...left buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p])))
          .toHaveLength(24);
        expect(getFromPath(timeTable, path.map((p) => prevDate.map[p]))[1])
          .toBe(null);

        // ...right buffer segment to have the correct number of timePeriod segments
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p])))
          .toHaveLength(24);
        expect(getFromPath(timeTable, path.map((p) => nextDate.map[p]))[1])
          .toBe(null);

        // ...inactive segments to have a value of undefined
        expect(getFromPath(timeTable, path.map((p) => inactivePrevDate.map[p])))
          .toBe(undefined);
        expect(getFromPath(timeTable, path.map((p) => inactiveNextDate.map[p])))
          .toBe(undefined);
      }
    });
  }
});
