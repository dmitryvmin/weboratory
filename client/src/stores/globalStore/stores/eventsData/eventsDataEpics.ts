// Libs
import { map, mergeAll, mergeMap, switchMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

// App
import { EVENTS_DATA, QUERY_EVENTS_DATA } from "@stores/globalStore/stores/eventsData/eventsDataConstants";
import { setEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";
import { findEventsBoundingBox } from "@components/Map/utils/findEventsBoundingBox";
import { EMPTY, of } from "rxjs";
import { EventsDataStateType } from "@stores/globalStore/stores/eventsData/types";
import { TLngLat } from "@common/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";
import { MAP_INSTANCE } from "@stores/globalStore/stores/map/mapConstants";
import { setMapCenter, setMapFlyToOptions, setMapPadding, setMapZoom } from "@stores/globalStore/stores/map/mapActions";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";

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

        if (coordinates.length === 0) {
          return EMPTY;
        }

        if (coordinates.length === 1) {
          return of(setMapCenter(coordinates[0]));
        }

        else {
          const bounds = findEventsBoundingBox(coordinates);
          const padding = { top: 10, bottom: 300, left: 10, right: 10 };
          const newCameraTransform = mapInstance.cameraForBounds(bounds, {
            padding,
          });
          if (!newCameraTransform) {
            return EMPTY;
          }

          // MapUtils.easeMapTo({
          //   mapInstance,
          //   ...newCameraTransform,
          //   padding,
          // });

          return of(
            setMapZoom(newCameraTransform.zoom),
            setMapCenter(newCameraTransform.center),
            // setMapFlyToOptions(newCameraTransform),
            // setMapPadding(padding),
          );
        }
      }
      else {
        return EMPTY;
      }
    }),
  );
}

const eventsDataEpics = combineEpics(
  fetchEventsDataEpic,
  fitMapToEventsBoundsEpic,
);

export { eventsDataEpics };
