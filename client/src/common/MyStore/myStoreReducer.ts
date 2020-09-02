import { myInitialState } from "@common/MyStore/myStoreDefaults";
import { MY_STATE } from "@common/MyStore/myStoreConstants";

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