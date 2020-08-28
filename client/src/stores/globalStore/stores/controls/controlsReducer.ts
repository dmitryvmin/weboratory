// App
import { calenderInitialState } from "@stores/globalStore/stores/calendar/calendarInitialState";
import { MAIN_MENU_STATE } from "@stores/globalStore/stores/controls/controlsConstants";

function controlsReducer(state = calenderInitialState, action) {

  switch (action.type) {

    case MAIN_MENU_STATE:
      return ({
        ...state,
        calStartDate: action.calStartDate,
      });

    default:
      return state;
  }
}

export { controlsReducer };