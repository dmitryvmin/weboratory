import { SEARCH_MODE } from "@stores/globalStore/stores/search/searchConstants";

export function setIsSearchOpen(searchMode) {
  return {
    type: SEARCH_MODE,
    searchMode,
  };
}
