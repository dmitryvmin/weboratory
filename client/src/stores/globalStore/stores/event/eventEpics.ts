// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

// App
import {
  CREATE_EVENT,
  EVENT_MODAL_CLOSED,
  EVENT_MODAL_OPEN,
  SET_EVENT_MODAL,
} from "@stores/globalStore/stores/event/eventConstants";
import { EventUtils } from "@stores/globalStore/stores/event/EventUtils";
import { setEvent } from "@stores/globalStore/stores/event/eventActions";
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";
import { EventStateType } from "@stores/globalStore/stores/event/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";
import { history } from "../../../../router";
import { DefaultEvent } from "@stores/globalStore/stores/event/eventDefaults";

const createNewEventEpic = (action$) => {
  return action$.pipe(
    ofType(CREATE_EVENT),
    switchMap(() => EventUtils.createEventObject(DefaultEvent)),
    map((event: any) => setEvent(event)),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const openEventModalEpic = (action$, state$) => {
  return action$.pipe(
    ofType(EVENT_MODAL_OPEN),
    switchMap(() => {

      const { mapInstance } = state$.value.mapReducer as MapStateType;
      const { event } = state$.value.eventReducer as EventStateType;

      if (mapInstance && event?.coordinates) {
        MapUtils.mapFlyTo({
          mapInstance,
          coords: event.coordinates,
          padding: { bottom: 400 },
        });
      }

      return EMPTY;
    }),
    map((event: any) => setEvent(event)),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const closeEventModalEpic = (action$, state$) => {
  return action$.pipe(
    ofType(EVENT_MODAL_CLOSED),
    switchMap(() => {
      history.push("/events");
      return EMPTY;
    }),
    map((event: any) => setEvent(event)),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const eventEpics = combineEpics(
  createNewEventEpic,
  openEventModalEpic,
  closeEventModalEpic,
);

export { eventEpics };
