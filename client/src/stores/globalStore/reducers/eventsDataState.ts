import { EventsDataActions } from "../constants/eventsDataActions";

function eventsDataState(currentState, action) {
  if (action.type && action.type === EventsDataActions.FETCH_EVENTS_DATA) {
    return true;
  }

  if (action.type && action.type === EventsDataActions.SET_EVENTS_DATA) {
    return false;
  }

  return currentState;
}

export { eventsDataState };
