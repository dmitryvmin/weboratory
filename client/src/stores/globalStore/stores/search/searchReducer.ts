import { searchInitialState } from "@stores/globalStore/stores/search/searchDefaults";
import { SEARCH_MODE } from "@stores/globalStore/stores/search/searchConstants";

function searchReducer(state = searchInitialState, action) {
  switch (action.type) {

    case SEARCH_MODE:
      return ({
        ...state,
        searchMode: action.searchMode,
      });

    default:
      return state;
  }
}

export { searchReducer };