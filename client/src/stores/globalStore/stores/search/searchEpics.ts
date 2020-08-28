// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { MY_STATE } from "@stores/globalStore/stores/search/searchConstants";
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";

// App
const myEpic = (action$) => {
  return action$.pipe(
    ofType(MY_STATE),
    switchMap(() => EMPTY),
    catchError(err => Promise.resolve(setSystemError(err.message))),
  );
};

const myEpics = combineEpics(
  myEpic,
);

export { myEpics };
