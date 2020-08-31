import { myInitialState } from "@common/MyStore/searchDefaults";
import { MY_STATE } from "@common/MyStore/searchConstants";

function myReducer(state = myInitialState, action) {
  switch (action.type) {

    case MY_STATE:
      return ({
        ...state,
        myState: action.myState,
      });

    default:
      return state;
  }
}

export { myReducer };