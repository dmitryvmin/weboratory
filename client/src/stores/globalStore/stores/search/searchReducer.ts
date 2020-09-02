import { searchInitialState } from "@stores/globalStore/stores/search/searchDefaults";
import { SEARCH_BY, SEARCH_MODE, SEARCHED_ADDRESS } from "@stores/globalStore/stores/search/searchConstants";

function searchReducer(state = searchInitialState, action) {
  switch (action.type) {

    case SEARCH_MODE:
      return ({
        ...state,
        searchMode: action.searchMode,
      });

    case SEARCHED_ADDRESS:
      return ({
        ...state,
        searchedAddress: action.searchedAddress,
      });

    case SEARCH_BY:
      return ({
        ...state,
        searchBy: action.searchBy,
      });

    default:
      return state;
  }
}

export { searchReducer };