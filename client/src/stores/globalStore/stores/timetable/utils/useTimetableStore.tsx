// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// App

// Types
import { getInViewEventsData, getTimeTable } from "@stores/globalStore/stores/timetable/timetableSelectors";
import { queryInViewEventsData } from "@stores/globalStore/stores/timetable/timetableActions";

/**
 * Map store facade
 */
export function useTimetableStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const inViewEventsData = useSelector(getInViewEventsData);

  const timeTable = useSelector(getTimeTable);

  /**
   * Dispatchers
   */
  const _queryInViewEventsData = useCallback(
    () => dispatch(queryInViewEventsData()),
    [dispatch],
  );

  return ({
    inViewEventsData,
    timeTable,
    queryInViewEventsData: _queryInViewEventsData,
  });
}