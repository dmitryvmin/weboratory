import { myInitialState } from "@stores/globalStore/stores/search/searchDefaults";
import { MY_STATE } from "@stores/globalStore/stores/search/searchConstants";

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