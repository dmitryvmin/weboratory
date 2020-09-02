import { timetableConstants } from "@stores/globalStore/stores/timetable/timetableConstants";

const {
  TIMETABLE,
  IN_VIEW_EVENTS_DATA,
  QUERY_IN_VIEW_EVENTS_DATA,
} = timetableConstants;

export function setTimeTable(timeTable) {
  return {
    type: TIMETABLE,
    timeTable,
  };
}

export function setInViewEventsData(inViewEventsData) {
  return {
    type: IN_VIEW_EVENTS_DATA,
    inViewEventsData,
  };
}

export function queryInViewEventsData() {
  return {
    type: QUERY_IN_VIEW_EVENTS_DATA,
  };
}
