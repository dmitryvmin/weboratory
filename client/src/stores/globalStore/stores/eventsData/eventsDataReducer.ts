import { initialEventsDataState } from "@stores/globalStore/stores/eventsData/eventsDataInitialState";
import { EVENTS_DATA } from "@stores/globalStore/stores/eventsData/eventsDataConstants";

function eventsDataReducer(state = initialEventsDataState, action) {

  switch (action.type) {

    case EVENTS_DATA:
      return ({
        ...state,
        eventsData: action.eventsData,
      });

    default:
      return state;
  }
}

export { eventsDataReducer };