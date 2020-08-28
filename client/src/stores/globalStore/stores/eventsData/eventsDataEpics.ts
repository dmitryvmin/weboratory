// Libs
import { map, mergeAll, mergeMap, switchMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

// App
import { EVENTS_DATA, QUERY_EVENTS_DATA } from "@stores/globalStore/stores/eventsData/eventsDataConstants";
import { setEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";
import { findEnclosingBoundingBox } from "@components/Map/utils/findBoundingBoxForCoords";
import { EMPTY } from "rxjs";
import { EventsDataStateType } from "@stores/globalStore/stores/eventsData/types";
import { TLngLat } from "@common/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";
import { MAP_INSTANCE } from "@stores/globalStore/stores/map/mapConstants";

export function fetchEventsDataEpic(action$) {
  return action$.pipe(
    ofType(QUERY_EVENTS_DATA),
    map(action => {
      return setEventsData([]);
    }),
  );
}

export function fitMapToEventsBoundsEpic(action$, state$) {
  return action$.pipe(
    ofType(EVENTS_DATA, MAP_INSTANCE),
    mergeMap(() => {
      const { eventsData } = state$.value.eventsDataReducer as EventsDataStateType;
      const { mapInstance } = state$.value.mapReducer as MapStateType;


      if (eventsData?.length && mapInstance) {
        const coordinates = eventsData.reduce((acc: TLngLat[], cur) => [cur.coordinates, ...acc], []);
        const bounds = findEnclosingBoundingBox(coordinates);

        console.log("@@bounds", bounds);
        mapInstance.fitBounds(bounds,
          { top: 50, bottom: 50, left: 50, right: 50 }
        );
      }

      return EMPTY;
      // return setEventsData([]);
    }),
  );
}

const eventsDataEpics = combineEpics(
  fetchEventsDataEpic,
  fitMapToEventsBoundsEpic,
);

export { eventsDataEpics };
