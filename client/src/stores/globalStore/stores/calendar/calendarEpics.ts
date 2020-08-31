// Libs
import { combineEpics, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
// App
import {
  CAL_CURRENT_DATE,
  QUERY_IN_VIEW_EVENTS_DATA,
  CAL_TIME_PERIOD,
  SLIDE_COUNT,
} from "@stores/globalStore/stores/calendar/calendarConstants";
import { EMPTY, of } from "rxjs";
import { TimeTable } from "@components/Calendar/utils/TimeTable";
import { setInViewEventsData, setTimeTable } from "@stores/globalStore/stores/calendar/calendarActions";
import { setEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";
import { getIntervalsData } from "@components/Calendar/utils/getIntervalsData";

const getInlViewDataEpic = (action$, state$) => {

  return action$.pipe(
    ofType(
      CAL_TIME_PERIOD,
      CAL_CURRENT_DATE,
      SLIDE_COUNT,
      QUERY_IN_VIEW_EVENTS_DATA,
    ),
    mergeMap((action) => {

      const {
        calTimePeriod,
        calCurrentDate,
        slideCount,
        timeTable,
        timeTableIntervals,
      } = state$.value.calendarReducer;

      if (
        !calTimePeriod ||
        !calCurrentDate ||
        !slideCount
      ) {
        return EMPTY;
      }

      const _timeTable = TimeTable.createTimeTable({
        calDate: calCurrentDate,
        calTimePeriod,
        visibleSlideCount: slideCount,
        timeTable,
      });

      const timeTableIntervalDates = TimeTable.getTimeTableIntervalDates({
        calTimePeriod,
        calDate: calCurrentDate,
        visibleSlideCount: slideCount,
        bufferSlideCount: 1,
      });

      const intervalsData = getIntervalsData(timeTableIntervalDates, calTimePeriod);

      const calendarData = intervalsData.reduce((acc, cur) => ({...acc, ...cur.dataMap}), {});
      const mapData = intervalsData
        .filter((interval) => !interval.intervalType.includes("BUFFER"))
        .reduce((acc, cur) => [...acc, ...cur.data], []);

      return of(
        setTimeTable(_timeTable),
        setEventsData(mapData),
        setInViewEventsData(calendarData),
      );
    }),
  );
};

const calendarEpics = combineEpics(
  getInlViewDataEpic,
);

export { calendarEpics };
