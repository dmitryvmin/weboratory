// Libs
import {combineEpics} from "redux-observable";

// App
import { mapEpics } from "@stores/globalStore/stores/map/mapEpics";
import { eventsDataEpics } from "@stores/globalStore/stores/eventsData/eventsDataEpics";
import { calendarEpics } from "@stores/globalStore/stores/calendar/calendarEpics";
import { eventEpics } from "@stores/globalStore/stores/event/eventEpics";

const rootEpic = combineEpics(
  calendarEpics,
  eventEpics,
  eventsDataEpics,
  mapEpics,
);

export {rootEpic};
