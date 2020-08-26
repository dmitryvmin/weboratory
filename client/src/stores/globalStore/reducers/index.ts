import { combineReducers } from "redux";
import { eventModalReducer } from "@stores/globalStore/reducers/eventModal";
import { calendarReducer } from "@stores/globalStore/reducers/calendar";
import { eventsDataReducer } from "@stores/globalStore/reducers/eventsData";

// import { eventsDataState } from "@stores/globalStore/reducers/eventsDataState";

// function rootReducer(currentState, action) {
//   return {
//     loading: eventsDataState(
//       currentState
//         ? currentState.loading
//         : false,
//       action,
//     ),
//   };
// }

const rootReducer = combineReducers({
  eventModalReducer,
  calendarReducer,
  eventsDataReducer,
});

export { rootReducer };
