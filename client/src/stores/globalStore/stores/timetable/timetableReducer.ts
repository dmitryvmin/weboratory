// App
import { timetableInitialState } from "@stores/globalStore/stores/timetable/timetableDefaults";
import { timetableConstants } from "@stores/globalStore/stores/timetable/timetableConstants";
const {
  TIMETABLE,
  IN_VIEW_EVENTS_DATA,
  QUERY_IN_VIEW_EVENTS_DATA,
} = timetableConstants;

export function timetableReducer(state = timetableInitialState, action) {
  switch (action.type) {

    case TIMETABLE:
      return ({
        ...state,
        timeTable: action.timeTable,
      });

    case IN_VIEW_EVENTS_DATA:
      return ({
        ...state,
        inViewEventsData: action.inViewEventsData,
      });

    case QUERY_IN_VIEW_EVENTS_DATA:
      return ({
        ...state,
      });

    default:
      return state;
  }
}
