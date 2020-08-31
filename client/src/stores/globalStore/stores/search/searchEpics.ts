// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

// App
import { SEARCH_MODE } from "@stores/globalStore/stores/search/searchConstants";
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";

// Epics
const searchIsOpenEpic = (action$) => {
  return action$.pipe(
    ofType(SEARCH_MODE),
    switchMap(() => EMPTY),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const myEpics = combineEpics(
  searchIsOpenEpic,
);

export { myEpics };
