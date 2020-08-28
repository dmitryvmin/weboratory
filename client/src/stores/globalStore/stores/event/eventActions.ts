import {
  SET_EVENT,
  CREATE_EVENT,
  EVENT_MODAL_CLOSED,
  EVENT_MODAL_OPEN,
  SET_EVENT_MODAL,
  UPDATE_EVENT,
} from "@stores/globalStore/stores/event/eventConstants";
import { EventModalType, EventPropsType } from "@stores/globalStore/stores/event/types";
import { IEvent } from "@common/types";

function setEventModalOpen() {
  return {
    type: EVENT_MODAL_OPEN,
  };
}

function setEventModalClosed() {
  return {
    type: EVENT_MODAL_CLOSED,
  };
}

function setEvent(event: IEvent) {
  return {
    type: SET_EVENT,
    event,
  };
}

function setEventModal(eventModal: EventModalType) {
  return {
    type: SET_EVENT_MODAL,
    eventModal,
  };
}

function createEvent(event: IEvent) {
  return {
    type: CREATE_EVENT,
    event,
  };
}

function updateEvent(event: EventPropsType) {
  return {
    type: UPDATE_EVENT,
    event,
  };
}

export {
  setEventModalOpen,
  setEventModalClosed,
  setEvent,
  createEvent,
  setEventModal,
  updateEvent,
};