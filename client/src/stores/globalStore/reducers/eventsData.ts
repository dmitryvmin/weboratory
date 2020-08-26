import { QUERY_EVENTS_DATA } from "@stores/globalStore/constants/eventsData";

const initialState = {
  eventsData: [],
};

function eventsDataReducer(state = initialState, action) {
  switch (action.type) {
    case QUERY_EVENTS_DATA:
      return ({
        ...state,
        eventsData: [],
      });
    default:
      return state;
  }
}

export { eventsDataReducer };