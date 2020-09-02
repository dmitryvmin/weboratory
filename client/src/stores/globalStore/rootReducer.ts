import { combineReducers } from "redux";
import { mapReducer } from "@stores/globalStore/stores/map/mapReducer";
import { systemReducer } from "@stores/globalStore/stores/system/systemReducer";
import { eventReducer } from "@stores/globalStore/stores/event/eventReducer";
import { calendarReducer } from "@stores/globalStore/stores/calendar/calendarReducer";
import { eventsDataReducer } from "@stores/globalStore/stores/eventsData/eventsDataReducer";
import { searchReducer } from "@stores/globalStore/stores/search/searchReducer";
import { controlsReducer } from "@stores/globalStore/stores/controls/controlsReducer";
import { timetableReducer } from "@stores/globalStore/stores/timetable/timetableReducer";
import { sliderReducer } from "@stores/globalStore/stores/slider/sliderReducer";

const rootReducer = combineReducers({
  systemReducer,
  controlsReducer,
  eventReducer,
  calendarReducer,
  eventsDataReducer,
  searchReducer,
  mapReducer,
  timetableReducer,
  sliderReducer,
});

export { rootReducer };
