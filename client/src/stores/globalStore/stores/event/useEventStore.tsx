// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEvent,
  setEventModal,
  setEventModalClosed,
  setEventModalOpen, updateEvent,
} from "@stores/globalStore/stores/event/eventActions";
import { getEvent, getEventModal, getIsEventModalOpen } from "@stores/globalStore/stores/event/eventSelectors";
import { IEvent } from "@common/types";
import { EventModalType, EventPropsType } from "@stores/globalStore/stores/event/types";

/**
 * Map store facade
 */
export function useEventStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const isEventModalOpen = useSelector(getIsEventModalOpen);
  const eventModal = useSelector(getEventModal);
  const event = useSelector(getEvent);

  /**
   * Dispatchers
   */
  const _setEvent = useCallback(
    (event: IEvent) => dispatch(setEvent(event)),
    [dispatch],
  );

  const _updateEvent = useCallback(
    (eventProps: EventPropsType) => dispatch(updateEvent(eventProps)),
    [dispatch],
  );


  const _setEventModal = useCallback(
    (eventModal: EventModalType) => dispatch(setEventModal(eventModal)),
    [dispatch],
  );

  const _setEventModalClosed = useCallback(
    () => dispatch(setEventModalClosed()),
    [dispatch],
  );

  const _setEventModalOpen = useCallback(
    () => dispatch(setEventModalOpen()),
    [dispatch],
  );

  return {
    setEvent: _setEvent,
    updateEvent: _updateEvent,
    setEventModal: _setEventModal,
    setEventModalOpen: _setEventModalOpen,
    setEventModalClosed: _setEventModalClosed,
    isEventModalOpen,
    eventModal,
    event,
  };
}