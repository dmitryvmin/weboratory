// Libs
import { useCallback } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";

// Actions
import {
  openEventFromMarker,
  setEvent,
  setEventModal, setEventModalAnimEnd, setEventModalAnimStart,
  setEventModalMode,
  startNewEvent,
  updateEvent,
} from "@stores/globalStore/stores/event/eventActions";

// Selectors
import {
  getEvent,
  getEventModal,
  getIsEventModalOpen,
} from "@stores/globalStore/stores/event/eventSelectors";

// Types
import { IEvent } from "@common/types";
import {
  EventModalType,
  EventPropsType,
} from "@stores/globalStore/stores/event/types";

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
  const isEventModalOpen: boolean = useSelector(getIsEventModalOpen);

  const eventModal: EventModalType = useSelector(getEventModal);

  const event: IEvent = useSelector(getEvent);

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
    () => dispatch(setEventModalMode("CLOSED")),
    [dispatch],
  );

  const _setEventModalOpen = useCallback(
    () => dispatch(setEventModalMode("OPEN")),
    [dispatch],
  );

  const _startNewEvent = useCallback(
    () => dispatch(startNewEvent()),
    [dispatch],
  );

  const _openEventFromMarker = useCallback(
    (event: EventPropsType, eventModal: EventModalType) => {
      return dispatch(openEventFromMarker(event, eventModal));
    },
    [dispatch],
  );

  const _setEventModalAnimStart = useCallback(
    () => dispatch(setEventModalAnimStart()),
    [dispatch],
  );

  const _setEventModalAnimEnd = useCallback(
    () => dispatch(setEventModalAnimEnd()),
    [dispatch],
  );

  return {
    setEvent: _setEvent,
    updateEvent: _updateEvent,
    setEventModal: _setEventModal,
    setEventModalOpen: _setEventModalOpen,
    setEventModalClosed: _setEventModalClosed,
    startNewEvent: _startNewEvent,
    openEventFromMarker: _openEventFromMarker,
    setEventModalAnimEnd: _setEventModalAnimEnd,
    setEventModalAnimStart: _setEventModalAnimStart,
    isEventModalOpen,
    eventModal,
    event,
  };
}