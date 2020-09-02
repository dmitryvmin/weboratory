import { EventModalType, EventPropsType, EventStateType } from "@stores/globalStore/stores/event/types";
import { getToday } from "@utils/date/getToday";

export const eventInitialState: EventStateType = {
  eventModalMode: "CLOSED",
  eventModal: undefined,
  event: undefined,
};

export const DefaultEvent: EventPropsType & EventModalType = {
  markerNode: undefined,
  eventId: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  time: getToday(),
  title: "New Event",
  content: "",
  visibility: "PUBLIC",
  address: "",
  coordinates: undefined,
};
