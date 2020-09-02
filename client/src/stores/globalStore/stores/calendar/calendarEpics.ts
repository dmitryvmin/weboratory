// Libs
import { combineEpics, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";

// App
import { calendarConstants } from "@stores/globalStore/stores/calendar/calendarConstants";

const {
  CAL_CURRENT_DATE,
  CAL_TIME_PERIOD,
} = calendarConstants;

const calendarEpics = combineEpics(
);

export { calendarEpics };
