import {EventsDataActions} from '../constants/eventsDataActions';
import { QUERY_EVENTS_DATA } from "@stores/globalStore/constants/eventsData";

function eventsData() {
  return {
    type: QUERY_EVENTS_DATA,
  };
}

export {
  eventsData,
};