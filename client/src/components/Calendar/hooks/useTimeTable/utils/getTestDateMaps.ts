import { getToday } from "@components/Calendar/utils/getToday";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { DateMap, TimePeriod } from "@components/Calendar/common/types";

export type TestDateMapsType = {
  [k: string]: {
    date: Date;
    map: DateMap;
    floor?: Date;
  };
}

function getTestDateMaps(timePeriod: TimePeriod): TestDateMapsType {

  const currentDate = getToday();
  const timeTableFloor = getBaseDate(currentDate, timePeriod, "floor");

  const prevDate = getDateAdjustedBy(currentDate, timePeriod, -1);
  const nextDate = getDateAdjustedBy(currentDate, timePeriod, 1);
  const inactivePrevDate = getDateAdjustedBy(currentDate, timePeriod, -2);
  const inactiveNextDate = getDateAdjustedBy(currentDate, timePeriod, 2);

  const curDateMap = getMapFromDate(currentDate);
  const prevDateMap = getMapFromDate(prevDate);
  const nextDateMap = getMapFromDate(nextDate);
  const inactivePrevDateMap = getMapFromDate(inactivePrevDate);
  const inactiveNextDateMap = getMapFromDate(inactiveNextDate);

  const dateMaps = ({
    curDate: {
      date: currentDate,
      map: curDateMap,
      floor: timeTableFloor,
    },
    prevDate: {
      date: prevDate,
      map: prevDateMap,
    },
    nextDate: {
      date: nextDate,
      map: nextDateMap,
    },
    inactivePrevDate: {
      date: inactivePrevDate,
      map: inactivePrevDateMap,
    },
    inactiveNextDate: {
      date: inactiveNextDate,
      map: inactiveNextDateMap,
    },
  });

  console.log("@@", dateMaps);

  return dateMaps;
}

export { getTestDateMaps };
