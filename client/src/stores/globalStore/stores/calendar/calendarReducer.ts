// App
import { calenderInitialState } from "@stores/globalStore/stores/calendar/calendarInitialState";
import {
  CAL_CURRENT_DATE,
  CAL_START_DATE,
  CAL_TIME_PERIOD,
  IN_VIEW_EVENTS_DATA,
  QUERY_IN_VIEW_EVENTS_DATA,
  SLIDER_X_DISTANCE,
  SLIDE_COUNT,
  SLIDE_WIDTH,
  CAL_MODE,
  TOGGLE_CAL_OPEN,
  TOGGLE_CAL_CLOSED,
} from "@stores/globalStore/stores/calendar/calendarConstants";
import { deriveCalMode } from "@stores/globalStore/stores/calendar/utils/deriveCalMode";

function calendarReducer(state = calenderInitialState, action) {
  switch (action.type) {

    case CAL_MODE:
      return ({
        ...state,
        calMode: action.calMode,
      });

    case TOGGLE_CAL_OPEN:
      return ({
        ...state,
        calMode: deriveCalMode(state.calMode, true) ?? state.calMode,
      });

    case TOGGLE_CAL_CLOSED:
      return ({
        ...state,
        calMode: deriveCalMode(state.calMode, false) ?? state.calMode,
      });

    case CAL_TIME_PERIOD:
      return ({
        ...state,
        calTimePeriod: action.calTimePeriod,
      });

    case SLIDE_WIDTH:
      return ({
        ...state,
        slideWidth: action.slideWidth,
      });

    case SLIDE_COUNT:
      return ({
        ...state,
        slideCount: action.slideCount,
      });

    case SLIDER_X_DISTANCE:
      return ({
        ...state,
        sliderXDistance: action.sliderXDistance,
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

export { calendarReducer };