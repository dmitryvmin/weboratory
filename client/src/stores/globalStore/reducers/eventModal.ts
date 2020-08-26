import { EVENT_MODAL_CLOSED, EVENT_MODAL_OPEN } from "@stores/globalStore/constants/eventModal";

const initialState = {
  eventModalIsOpen: false,
};

function eventModalReducer(state = initialState, action) {
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
    default:
      return state;
  }
}

export { eventModalReducer };