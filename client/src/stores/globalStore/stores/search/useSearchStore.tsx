// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsSearchClosed, getIsSearchOpen, getSearchBy,
  getSearchedAddress,
  getSearchMode,
} from "@stores/globalStore/stores/search/searchSelectors";
import { setSearchBy, setSearchedAddress, setSearchMode } from "@stores/globalStore/stores/search/searchActions";
import { EventSearchCriterium } from "@stores/globalStore/stores/search/types";

/**
 * Map store facade
 */
export function useSearchStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const searchMode = useSelector(getSearchMode);

  const searchedAddress = useSelector(getSearchedAddress);

  const isSearchOpen = useSelector(getIsSearchOpen);

  const isSearchClosed = useSelector(getIsSearchClosed);

  const searchBy = useSelector(getSearchBy);

  /**
   * Dispatchers
   */
  const _setSearchMode = useCallback(
    (searchMode) => dispatch(setSearchMode(searchMode)),
    [dispatch],
  );

  const openSearch = useCallback(
    () => dispatch(setSearchMode("OPEN")),
    [dispatch],
  );

  const closeSearch = useCallback(
    () => dispatch(setSearchMode("CLOSED")),
    [dispatch],
  );

  const _setSearchedAddress = useCallback(
    (searchedAddress) => dispatch(setSearchedAddress(searchedAddress)),
    [dispatch],
  );

  const _setSearchBy = useCallback(
    (searchBy: EventSearchCriterium) => dispatch(setSearchBy(searchBy)),
    [dispatch],
  );

  return {
    searchMode,
    searchedAddress,
    openSearch,
    closeSearch,
    isSearchOpen,
    isSearchClosed,
    searchBy,
    setSearchBy: _setSearchBy,
    setSearchMode: _setSearchMode,
    setSearchedAddress: _setSearchedAddress,
  };
}