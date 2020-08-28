import { QUERY_EVENTS_DATA, EVENTS_DATA } from "@stores/globalStore/stores/eventsData/eventsDataConstants";
import { IEvent } from "@common/types";

function queryEventsData() {
  return {
    type: QUERY_EVENTS_DATA,
  };
}

function setEventsData(eventsData: IEvent[]) {
  return {
    type: EVENTS_DATA,
    eventsData,
  };
}

export {
  queryEventsData,
  setEventsData,
};