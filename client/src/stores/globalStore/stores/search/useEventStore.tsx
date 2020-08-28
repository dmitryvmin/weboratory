// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const mySelector = useSelector();

  /**
   * Dispatchers
   */
  const _myDispatcher = useCallback(
    () => dispatch(_myDispatcher()),
    [dispatch],
  );

  return {
    mySelector,
    myDispatcher: _myDispatcher,
  };
}