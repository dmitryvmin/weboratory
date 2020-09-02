export const getSearchMode = state => state.searchReducer.getSearchMode;

export const getSearchedAddress = state => state.searchReducer.getSearchedAddress;

export const getIsSearchOpen = state => state.searchReducer.searchMode === "OPEN";

export const getIsSearchClosed = state => state.searchReducer.searchMode === "CLOSED";

export const getSearchBy = state => state.searchReducer.searchBy;
