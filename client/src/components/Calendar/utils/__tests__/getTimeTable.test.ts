import { getTimeTable } from "../getTimeTable";
import { generateEventsMockData } from "@components/Calendar/__mocks__/generateEventsMockData";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { getEventsAtTimeScaleForInterval } from "@components/Calendar/utils/getEventsAtTimeScaleForInterval";

describe("TimeTable class test", () => {

  it("should generate a TimeTable correctly using params", () => {
    // given
    const timePeriod = "MONTH";
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const timeTableStart = getTimestamp(currentDate, timePeriod, -1);
    const timeTableEnd = getTimestamp(currentDate, timePeriod, 1);
    const timeTableFloor = getBaseDate(timeTableStart, "MONTH", "floor");
    const timeTableCeiling = getBaseDate(timeTableEnd, "MONTH", "ceiling");
    const eventsData = generateEventsMockData();
    const eventsDataMap = getEventsAtTimeScaleForInterval({
      eventsData,
      intervalStart: timeTableFloor,
      intervalEnd: timeTableCeiling,
    });
    const timetable = getTimeTable({ eventsDataMap, timeTableFloor, timeTableCeiling });

    // expect
    expect(Object.keys(timetable)[0]).toBe(currentYear.toString());
    expect(timetable[currentYear]).toHaveLength(12);

  });
});
