// Libs
import { combineEpics, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { EMPTY, of } from "rxjs";

// Store
import { setEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";

// Utils
import { getIntervalsData } from "@utils/date/getIntervalsData";
import { TimeTableUtils } from "@stores/globalStore/stores/timetable/utils/TimeTableUtils";

// Constants
import { timetableConstants } from "@stores/globalStore/stores/timetable/timetableConstants";
import { calendarConstants } from "@stores/globalStore/stores/calendar/calendarConstants";
import { sliderConstants } from "@stores/globalStore/stores/slider/sliderConstants";

// Stores
import { setInViewEventsData, setTimeTable } from "@stores/globalStore/stores/timetable/timetableActions";

const {
  QUERY_IN_VIEW_EVENTS_DATA,
} = timetableConstants;

const {
  CAL_TIME_PERIOD,
  CAL_CURRENT_DATE,
} = calendarConstants

const {
  SLIDE_COUNT,
} = sliderConstants;

const getInViewDataEpic = (action$, state$) => {

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
        timeTable,
        // timeTableIntervals,
      } = state$.value.calendarReducer;

      const { slideCount } = state$.value.sliderReducer;

      if (
        !calTimePeriod ||
        !calCurrentDate ||
        !slideCount
      ) {
        return EMPTY;
      }

      const _timeTable = TimeTableUtils.createTimeTable({
        calDate: calCurrentDate,
        calTimePeriod,
        visibleSlideCount: slideCount,
        timeTable,
      });

      const timeTableIntervalDates = TimeTableUtils.getTimeTableIntervalDates({
        calTimePeriod,
        calDate: calCurrentDate,
        visibleSlideCount: slideCount,
        bufferSlideCount: 1,
      });

      const intervalsData = getIntervalsData(timeTableIntervalDates, calTimePeriod);

      const calendarData = intervalsData.reduce((acc, cur) => ({ ...acc, ...cur.dataMap }), {});
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

const timetableEpics = combineEpics(
  getInViewDataEpic,
);

export { timetableEpics };
