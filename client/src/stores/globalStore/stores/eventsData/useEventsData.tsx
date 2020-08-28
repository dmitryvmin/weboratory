// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// App
import { getEventsData } from "@stores/globalStore/stores/eventsData/eventsDataSelectors";
import { queryEventsData } from "@stores/globalStore/stores/eventsData/eventsDataActions";

/**
 * Map store facade
 */
export function useEventsDataStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  const eventsData = useSelector(getEventsData);

  const _queryEventsData = useCallback(
    () => dispatch(queryEventsData()),
    [dispatch],
  );

  return {
    eventsData,
    queryEventsData: _queryEventsData,
  };
}