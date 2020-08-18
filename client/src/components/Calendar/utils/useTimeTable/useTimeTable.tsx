// Libs
import React, { useEffect, useRef, useState } from "react";

// App
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { SLIDER_BUFFER } from "@components/Calendar/constants";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { getEventsAtTimeScaleForInterval } from "@components/Calendar/utils/getEventsAtTimeScaleForInterval";
import { TimeTable } from "@components/Calendar/utils/useTimeTable/createTimeTable";
import { createTimeTable } from "@components/Calendar/utils/useTimeTable/createTimeTable";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";
import { updateTimeTable } from "@components/Calendar/utils/useTimeTable/updateTimeTable";
import { log } from "@dmitrymin/fe-log";

/**
 * TimeTable
 */
function useTimeTable(
  calendarMarker,
  timePeriod,
  slideCount,
  eventsData,
) {
  const [timeTable, setTimeTable] = useState<TimeTable>();
  const calendarMarkerRef = useRef<Date>();

  useEffect(() => {

    const timeRangeStart = getTimestamp(calendarMarker, timePeriod, -SLIDER_BUFFER);
    const timeRangeEnd = getTimestamp(calendarMarker, timePeriod, SLIDER_BUFFER);

    const timeTableFloor = getBaseDate(timeRangeStart, timePeriod, "floor");
    const timeTableCeiling = getBaseDate(timeRangeEnd, timePeriod, "ceiling");

    const eventsDataMap = getEventsAtTimeScaleForInterval({
      eventsData,
      intervalStart: timeTableFloor,
      intervalEnd: timeTableCeiling,
    });

    const _timetable = createTimeTable({
      eventsDataMap,
      timeTableFloor,
      timeTableCeiling,
    });

    setTimeTable(_timetable);
    calendarMarkerRef.current = calendarMarker;

    log("Timetable", _timetable, eventsDataMap);
  }, [
    // slideCount,
    // calendarMarker,
    // timePeriod
  ]);

  // useEffect(() => {
  //
  //   if (
  //     !timeTable ||
  //     !calendarMarkerRef.current ||
  //     calendarMarker.getTime() === calendarMarkerRef.current.getTime()
  //   ) {
  //     return;
  //   }
  //
  //   const delta = getMapFromDate(calendarMarker)[timePeriod] - getMapFromDate(calendarMarkerRef.current)[timePeriod];
  //
  //   const timeRangeStart = getTimestamp(calendarMarker, timePeriod, -SLIDER_BUFFER);
  //   const timeRangeEnd = getTimestamp(calendarMarker, timePeriod, SLIDER_BUFFER);
  //
  //   const timeTableFloor = getBaseDate(timeRangeStart, timePeriod, "floor");
  //   const timeTableCeiling = getBaseDate(timeRangeEnd, timePeriod, "ceiling");
  //
  //   const eventsDataMap = getEventsAtTimeScaleForInterval({
  //     eventsData,
  //     intervalStart: timeTableFloor,
  //     intervalEnd: timeTableCeiling,
  //   });
  //
  //   const _timetable = updateTimeTable({
  //     eventsDataMap,
  //     timeTable,
  //     timePeriod,
  //     calendarMarker,
  //     delta,
  //   });
  //
  //   setTimeTable(_timetable);
  //
  //   log("Timetable", _timetable);
  //
  // }, [
  //   slideCount,
  //   calendarMarker,
  //   timePeriod
  // ]);

  return timeTable;
}

export {useTimeTable};
