import {combineEpics} from "redux-observable";
import {fetchEventsData} from "./eventsData";

export default combineEpics(
  fetchEventsData,
);