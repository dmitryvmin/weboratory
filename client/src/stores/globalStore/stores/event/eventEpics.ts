// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, map, mergeMap, switchMap, take } from "rxjs/operators";
import { EMPTY, of } from "rxjs";

// App
import {
  EVENT_MODAL_ANIM_END, EVENT_MODAL_ANIM_START,
  EVENT_MODAL_MODE,
  OPEN_EVENT_FROM_MARKER,
  START_NEW_EVENT,
} from "@stores/globalStore/stores/event/eventConstants";
import { EventUtils } from "@stores/globalStore/stores/event/EventUtils";
import {
  setEvent,
  setEventModal,
  setEventModalMode,
} from "@stores/globalStore/stores/event/eventActions";
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";
import { EventModalType, EventStateType } from "@stores/globalStore/stores/event/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";
import { history } from "../../../../router";
import { DefaultEvent } from "@stores/globalStore/stores/event/eventDefaults";
import { IEvent } from "@common/types";
import { setMapAnimation } from "@stores/globalStore/stores/map/mapActions";
import { mapEasingFunctions } from "@stores/globalStore/stores/map/mapDefaults";

const startNewEventEpic = (action$) => {
  return action$.pipe(
    ofType(START_NEW_EVENT),
    switchMap(() => EventUtils.createEventObject(DefaultEvent)),
    map((event: IEvent) => setEvent(event)),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const openEventFromMarkerEpic = (action$) => {
  return action$.pipe(
    ofType(OPEN_EVENT_FROM_MARKER),
    switchMap(({ event, eventModal }: { event: IEvent; eventModal: EventModalType }) => {
      return of(
        setEvent(event),
        setEventModal(eventModal),
        setEventModalMode("OPEN"),
      );
    }),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const postModalOpenEpic = (action$, state$) => {

  return action$.pipe(
    ofType("POST_MODAL_OPEN"),
    switchMap(() => {

      const { mapInstance } = state$.value.mapReducer as MapStateType;
      const { event } = state$.value.eventReducer as EventStateType;

      if (!mapInstance || !event?.coordinates) {
        return EMPTY;
      }

      MapUtils.mapFlyTo({
        mapInstance,
        coords: event.coordinates,
        padding: { bottom: 400 },
      });

      history.push(`/events/${event?.eventId}`);

      return EMPTY;
    }),
  );
};

const postModalCloseEpic = (action$, state$) => {

  return action$.pipe(
    ofType("POST_MODAL_CLOSE"),
    switchMap(() => {

      const { mapInstance } = state$.value.mapReducer as MapStateType;
      const { event } = state$.value.eventReducer as EventStateType;

      if (!mapInstance || !event?.coordinates) {
        return EMPTY;
      }

      MapUtils.mapFlyTo({
        mapInstance,
        coords: event.coordinates,
      });

      history.push("/events");

      return EMPTY;
    }),
  );
};

const modalAnimStartEpic = (action$, state$) => {
  return action$.pipe(
    ofType(EVENT_MODAL_ANIM_START),
    switchMap(() => {

      const { eventModalMode } = state$.value.eventReducer as EventStateType;

      if (eventModalMode === "CLOSED") {
        // return of(() => ({
        //   type: "POST_MODAL_CLOSE",
        // }));

        const { mapInstance } = state$.value.mapReducer as MapStateType;
        const { event } = state$.value.eventReducer as EventStateType;

        if (!mapInstance || !event?.coordinates) {
          return EMPTY;
        }

        MapUtils.mapFlyTo({
          mapInstance,
          coords: event.coordinates,
        });

        history.push("/events");
      }

        return EMPTY;
    }),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const modalAnimEndEpic = (action$, state$) => {
  return action$.pipe(
    ofType(EVENT_MODAL_ANIM_END),
    switchMap(() => {

      const { eventModalMode } = state$.value.eventReducer as EventStateType;

      if (eventModalMode === "OPEN") {
        // return of(() => ({
        //   type: "POST_MODAL_OPEN",
        // }));

        // const { mapInstance } = state$.value.mapReducer as MapStateType;
        // const { event } = state$.value.eventReducer as EventStateType;
        //
        // if (!mapInstance || !event?.coordinates) {
        //   return EMPTY;
        // }
        //
        // MapUtils.mapFlyTo({
        //   mapInstance,
        //   coords: event.coordinates,
        //   padding: { bottom: 400 },
        // });
        //
        // history.push(`/events/${event?.eventId}`);
      }

      else {

        const { mapInstance } = state$.value.mapReducer as MapStateType;
        const { event } = state$.value.eventReducer as EventStateType;

        if (!mapInstance || !event?.coordinates) {
          return EMPTY;
        }

        MapUtils.mapFlyTo({
          mapInstance,
          coords: event.coordinates,
        });

        history.push("/events");
      }

      return EMPTY;
    }),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const eventModalModeModeEpic = (action$, state$) => {
  return action$.pipe(
    ofType(EVENT_MODAL_MODE),
    switchMap(({ eventModalMode }) => {

      // if (eventModalMode === "CLOSED") {}

      if (eventModalMode === "OPEN") {

        const { mapInstance } = state$.value.mapReducer as MapStateType;
        const { event } = state$.value.eventReducer as EventStateType;

        if (!mapInstance || !event?.coordinates) {
          return EMPTY;
        }

        MapUtils.mapFlyTo({
          mapInstance,
          coords: event.coordinates,
          padding: { bottom: 400 },
          animate: true,
          duration: 1000,
          easing: mapEasingFunctions.easeOutQuint,
        });

        history.push(`/events/${event?.eventId}`);
      }

      return EMPTY;
    }),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const eventEpics = combineEpics(
  startNewEventEpic,
  openEventFromMarkerEpic,
  eventModalModeModeEpic,
  modalAnimEndEpic,
  // modalAnimStartEpic,
  // postModalOpenEpic,
  // postModalCloseEpic,
);

export { eventEpics };
