// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";
import { EMPTY, of } from "rxjs";

// App
import { getClientPosition } from "@components/Events/utils/getClientPosition";
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";
import { MAP_CENTER_ON_CLIENT } from "@stores/globalStore/stores/map/mapConstants";
import { setMapCenter } from "@stores/globalStore/stores/map/mapActions";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";

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

const centerMapOnAddressEpic = (action$, state$) => {
  return action$.pipe(
    ofType(MAP_CENTER_ON_CLIENT),
    switchMap((address) => {
      debugger;
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