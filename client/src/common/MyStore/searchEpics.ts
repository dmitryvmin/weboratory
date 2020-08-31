// Libs
import { combineEpics, ofType } from "redux-observable";
import { catchError, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

// App
import { setSystemError } from "@stores/globalStore/stores/system/systemActions";
import { MY_STATE } from "@common/MyStore/searchConstants";

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
