// App
import { calenderInitialState } from "@stores/globalStore/stores/calendar/calendarDefaults";
import {calendarConstants} from "@stores/globalStore/stores/calendar/calendarConstants";
const {
  CAL_CURRENT_DATE,
  CAL_START_DATE,
  CAL_TIME_PERIOD,
  CAL_MODE,
  HOVERED_SEGMENT,
} = calendarConstants;

function calendarReducer(state = calenderInitialState, action) {
  switch (action.type) {

    case CAL_MODE:
      return ({
        ...state,
        calMode: action.calMode,
      });

    case HOVERED_SEGMENT:
      return ({
        ...state,
        hoveredSegment: action.hoveredSegment,
      });

    case CAL_TIME_PERIOD:
      return ({
        ...state,
        calTimePeriod: action.calTimePeriod,
      });

    case CAL_START_DATE:
      return ({
        ...state,
        calStartDate: action.calStartDate,
      });

    case CAL_CURRENT_DATE:
      return ({
        ...state,
        calCurrentDate: action.calCurrentDate,
      });

    default:
      return state;
  }
}

export { calendarReducer };