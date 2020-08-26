import { EVENT_MODAL_CLOSED, EVENT_MODAL_OPEN } from "@stores/globalStore/constants/eventModal";

function openEventModal() {
  return {
    type: EVENT_MODAL_OPEN,
  };
}

function closeEventModal() {
  return {
    type: EVENT_MODAL_CLOSED,
  };
}

export {
  openEventModal,
  closeEventModal,
};