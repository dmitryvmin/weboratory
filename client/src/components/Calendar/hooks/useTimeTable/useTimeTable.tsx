// Libs
import React, { useEffect, useRef, useState } from "react";
import { log } from "@dmitrymin/fe-log";

// Constants
import { SLIDER_BUFFER } from "@components/Calendar/constants";

// Hooks
import { TimeTable } from "@components/Calendar/hooks/useTimeTable/TimeTable";

// Utils
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";
import { getEventsForTimePeriodInterval } from "@components/Calendar/utils/getEventsForTimePeriodInterval";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { TimeTableType, UseTimeTableProps } from "@components/Calendar/hooks/useTimeTable/types";

/**
 * TimeTable
 */
function useTimeTable({
  currentDate,
  timePeriod,
  slideCount,
}: UseTimeTableProps) {

  // log("============ useTimeTable ============",
  //   currentDate,
  //   timePeriod,
  //   slideCount,
  // );

  const [timeTable, setTimeTable] = useState<TimeTableType>();
  const currentDateRef = useRef<Date>();

  useEffect(() => {

    const _timetable = TimeTable.createTimeTable({
      calendarDate: currentDate,
      calendarTimePeriod: timePeriod,
      visibleSlideCount: slideCount,
      timeTable,
    });

    setTimeTable(_timetable);
    currentDateRef.current = currentDate;

    // log("Timetable", _timetable, slideCount);
  }, [
    slideCount,
    timePeriod,
    currentDate,
  ]);

  return timeTable;
}

export { useTimeTable };
