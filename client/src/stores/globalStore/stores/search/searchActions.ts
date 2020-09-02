import { SEARCH_BY, SEARCH_MODE, SEARCHED_ADDRESS } from "@stores/globalStore/stores/search/searchConstants";
import {
  EventSearchCriterium,
  SearchedAddressType,
  SearchModeType,
} from "@stores/globalStore/stores/search/types";

export function setSearchMode(searchMode: SearchModeType) {
  return {
    type: SEARCH_MODE,
    searchMode,
  };
}

export function setSearchedAddress(searchedAddress: SearchedAddressType) {
  return {
    type: SEARCHED_ADDRESS,
    searchedAddress,
  };
}

export function setSearchBy(searchBy: EventSearchCriterium) {
  return {
    type: SEARCH_BY,
    searchBy,
  };
}
