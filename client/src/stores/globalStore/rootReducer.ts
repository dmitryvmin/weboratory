import { combineReducers } from "redux";
import { mapReducer } from "@stores/globalStore/stores/map/mapReducer";
import { systemReducer } from "@stores/globalStore/stores/system/systemReducer";
import { eventReducer } from "@stores/globalStore/stores/event/eventReducer";
import { calendarReducer } from "@stores/globalStore/stores/calendar/calendarReducer";
import { eventsDataReducer } from "@stores/globalStore/stores/eventsData/eventsDataReducer";

const rootReducer = combineReducers({
  systemReducer,
  eventReducer,
  calendarReducer,
  eventsDataReducer,
  mapReducer,
});

export { rootReducer };
