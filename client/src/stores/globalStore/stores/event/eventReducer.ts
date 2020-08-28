import {
  EVENT_MODAL_CLOSED,
  EVENT_MODAL_OPEN,
  SET_EVENT, SET_EVENT_MODAL, UPDATE_EVENT,
} from "@stores/globalStore/stores/event/eventConstants";
import { eventInitialState } from "@stores/globalStore/stores/event/eventDefaults";

function eventReducer(state = eventInitialState, action) {
  switch (action.type) {

    case EVENT_MODAL_OPEN:
      return ({
        ...state,
        isEventModalOpen: true,
      });

    case EVENT_MODAL_CLOSED:
      return ({
        ...state,
        isEventModalOpen: false,
      });

    case SET_EVENT:
      return ({
        ...state,
        event: action.event,
      });

    case UPDATE_EVENT:
      return ({
        ...state,
        event: {
          ...state.event,
          ...action.event,
        },
      });

    case SET_EVENT_MODAL:
      return ({
        ...state,
        isEventModalOpen: true,
        eventModal: action.eventModal,
      });

    default:
      return state;
  }
}

export { eventReducer };