// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
// App
import {
  CAL_CURRENT_DATE,
  QUERY_IN_VIEW_EVENTS_DATA,
  CAL_TIME_PERIOD, SLIDE_COUNT,
} from "@stores/globalStore/stores/calendar/calendarConstants";
import { getIntervalEventsDataMap } from "@components/Calendar/utils/getIntervalEventsDataMap";
import { mockEventsData } from "@components/Calendar/__mocks__/mockEventsData";
import { setEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";
import { of } from "rxjs";
import { setInViewEventsData } from "@stores/globalStore/stores/calendar/calendarActions";

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
      } = state$.value.calendarReducer;

      const { eventsDataMap: calendarEvents } = getIntervalEventsDataMap({
        calTimePeriod,
        calDate: calCurrentDate,
        visibleSlideCount: slideCount,
        eventsData: mockEventsData,
      });

      const { eventsDataArray: mapEvents } = getIntervalEventsDataMap({
        calTimePeriod,
        calDate: calCurrentDate,
        visibleSlideCount: slideCount,
        eventsData: mockEventsData,
        bufferSlideCount: 0,
      });

      return of(
        setEventsData(mapEvents),
        setInViewEventsData(calendarEvents),
      );
    }),
  );
};

const calendarEpics = combineEpics(
  getInlViewDataEpic,
);

export { calendarEpics };
