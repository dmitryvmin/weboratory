// Libs
import { combineEpics, ofType } from "redux-observable";
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  takeUntil,
  concatAll,
  concatMap,
  reduce,
  tap, scan, flatMap, mergeScan, take, takeWhile, distinct, distinctUntilChanged, mergeAll, exhaustMap, mapTo,
} from "rxjs/operators";
import { concat, EMPTY, from, Observer, of, pipe } from "rxjs";

// Utils
import { getClientPosition } from "@components/Events/utils/getClientPosition";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";

// Actions
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";
import { setMapCenter, setMapMarkerRefs } from "@stores/globalStore/stores/map/mapActions";

// Constants
import { MAP_CENTER_ON_CLIENT, MAP_MARKER_REF } from "@stores/globalStore/stores/map/mapConstants";

const centerMapOnClientEpic = (action$) => {
  return action$.pipe(
    ofType(MAP_CENTER_ON_CLIENT),
    switchMap(action =>
      of(getClientPosition()),
    ),
    map(setMapCenter),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const setMapMarkerRefsEpic = (action$, state$) => {

  const accumulator = (acc: any, cur: any) => {
    return [...acc, cur.mapMarkerRef];
  };

  let mapRefs: any = [];

  // Establish pipeline
  return action$.pipe(
    ofType(MAP_MARKER_REF),
    mergeMap(({mapMarkerRef}: any) => {
      const { eventsData } = state$.value.eventsDataReducer;
      if (mapRefs.length === eventsData.length) {
        const m = mapRefs;
        mapRefs = [];
        return of(setMapMarkerRefs(m));
      }
      else {
        mapRefs.push(mapMarkerRef);
        return EMPTY;
      }
    }),
  );
};

const centerMapOnAddressEpic = (action$, state$) => {
  return action$.pipe(
    ofType(MAP_CENTER_ON_CLIENT),
    switchMap((address) => {
      return of(geocodeQuery(address));
    }),
    map((coords: any) => {
      return MapUtils.mapFlyTo({
        mapInstance: state$.mapInstance,
        coords,
        speed: 1,
      });
    }),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const mapEpics = combineEpics(
  centerMapOnClientEpic,
  setMapMarkerRefsEpic,
);

export { mapEpics };

// const centerMapOnAddress = async (
//   address: string,
//   minLength = SEARCH_MIN,
// ) => {
//
//   // Don't center until input is long enough to make a prediction
//   if (address.length < minLength) {
//     return;
//   }
//

// };
//
// const centerMapOnCoords = (coords: TLngLat) => {
//   setMapCenter(coords);
// };

// const centerMapOnAddress = async (
//   address: string,
//   minLength = SEARCH_MIN,
// ) => {
//
//   // Don't center until input is long enough to make a prediction
//   if (address.length < minLength) {
//     return;
//   }
//
//   const lngLat = await geocodeQuery(address);
//   if (!lngLat) {
//     return;
//   }
//
//   // setMapCenter(lngLat);
//   mapInstance.flyTo({
//     center: getLngLatTuple(lngLat),
//     speed: 1,
//     curve: 1,
//   });
// };
//
// const centerMapOnCoords = (coords: TLngLat) => {
//   setMapCenter(coords);
// };