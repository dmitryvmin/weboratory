import {
  SET_EVENT,
  SET_EVENT_MODAL,
  UPDATE_EVENT,
  START_NEW_EVENT,
  EVENT_MODAL_MODE,
  OPEN_EVENT_FROM_MARKER, EVENT_MODAL_ANIM_END, EVENT_MODAL_ANIM_START,
} from "@stores/globalStore/stores/event/eventConstants";
import { EventModalType, EventPropsType } from "@stores/globalStore/stores/event/types";
import { IEvent } from "@common/types";

export function setEventModalMode(eventModalMode) {
  return {
    type: EVENT_MODAL_MODE,
    eventModalMode,
  };
}

export function setEvent(event: IEvent) {
  return {
    type: SET_EVENT,
    event,
  };
}

export function setEventModal(eventModal: EventModalType) {
  return {
    type: SET_EVENT_MODAL,
    eventModal,
  };
}

export function openEventFromMarker(event: EventPropsType, eventModal: EventModalType) {
  return {
    type: OPEN_EVENT_FROM_MARKER,
    event,
    eventModal,
  };
}

export function startNewEvent() {
  return {
    type: START_NEW_EVENT,
  };
}

export function updateEvent(event: EventPropsType) {
  return {
    type: UPDATE_EVENT,
    event,
  };
}

export function setEventModalAnimStart() {
  return {
    type: EVENT_MODAL_ANIM_START,
  };
}

export function setEventModalAnimEnd() {
  return {
    type: EVENT_MODAL_ANIM_END,
  };
}



