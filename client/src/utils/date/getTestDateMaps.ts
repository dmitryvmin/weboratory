// Utils
import { getDateAdjustedBy } from "@utils/date/getDateAdjustedBy";
import { getMapFromDate } from "@utils/date/getMapFromDate";
import { getBaseDate } from "@utils/date/getBaseDate";
import { getToday } from "@utils/date/getToday";

// Types
import { TimePeriod } from "@components/Calendar/common/types";
import { TestDateMapsType } from "@stores/globalStore/stores/timetable/types";

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
