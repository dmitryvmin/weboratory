// Libs
import {combineEpics} from "redux-observable";

// App
import { mapEpics } from "@stores/globalStore/stores/map/mapEpics";
import { eventsDataEpics } from "@stores/globalStore/stores/eventsData/eventsDataEpics";
import { calendarEpics } from "@stores/globalStore/stores/calendar/calendarEpics";
import { eventEpics } from "@stores/globalStore/stores/event/eventEpics";
import { timetableEpics } from "@stores/globalStore/stores/timetable/timetableEpics";
import { sliderEpics } from "@stores/globalStore/stores/slider/sliderEpics";

const rootEpic = combineEpics(
  calendarEpics,
  eventEpics,
  eventsDataEpics,
  mapEpics,
  timetableEpics,
  sliderEpics,
);

export {rootEpic};
