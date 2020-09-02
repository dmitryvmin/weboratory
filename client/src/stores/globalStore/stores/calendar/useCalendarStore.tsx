// Libs
import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// Store
import {
  getCalCurrentDate,
  getCalStartDate,
  getCalTimePeriod,
  getCalMode,
  getHoveredSegment,
} from "@stores/globalStore/stores/calendar/calendarSelectors";
import {
  setCalCurrentDate,
  setCalStartDate,
  setCalTimePeriod,
  setCalMode, setHoveredSegment,
} from "@stores/globalStore/stores/calendar/calendarActions";

// Types
import { SegmentType } from "@stores/globalStore/stores/calendar/types";
import { TimePeriod } from "@components/Calendar/common/types";

// Utils
import { getParentTimePeriod } from "@utils/date/getParentTimePeriod";
import { getChildTimePeriod } from "@utils/date/getChildTimePeriod";

/**
 * Map store facade
 */
export function useCalendarStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const calTimePeriod = useSelector(getCalTimePeriod);

  const calCurrentDate = useSelector(getCalCurrentDate);

  const calStartDate = useSelector(getCalStartDate);

  const calMode = useSelector(getCalMode);

  const hoveredSegment: SegmentType = useSelector(getHoveredSegment);

  const isCalAtMinPeriod = useMemo(
    () => calTimePeriod === "HOUR",
    [
      dispatch,
      calTimePeriod,
    ],
  );

  const isCalAtMaxPeriod = useMemo(
    () => calTimePeriod === "YEAR",
    [
      dispatch,
      calTimePeriod,
    ],
  );

  /**
   * Dispatchers
   */
  const _setCalCurrentDate = useCallback(
    (date: Date) => dispatch(setCalCurrentDate(date)),
    [dispatch],
  );

  const _setCalStartDate = useCallback(
    (date: Date) => dispatch(setCalStartDate(date)),
    [dispatch],
  );

  const _setCalTimePeriod = useCallback(
    (timePeriod: TimePeriod) => dispatch(setCalTimePeriod(timePeriod)),
    [dispatch],
  );

  const setCalOpen = useCallback(
    () => dispatch(setCalMode("DOCKED")),
    [dispatch],
  );

  const setCalClosed = useCallback(
    () => dispatch(setCalMode("CLOSED")),
    [dispatch],
  );

  const _setHoveredSegment = useCallback(
    (hoveredSegment) => dispatch(setHoveredSegment(hoveredSegment)),
    [dispatch],
  );

  const calPeriodZoomIn = useCallback(
    () => {
      // If we can't zoom in any more, return
      if (isCalAtMinPeriod) {
        return;
      }
      const timePeriod = getChildTimePeriod(calTimePeriod);
      return dispatch(setCalTimePeriod(timePeriod));
     },
    [
      dispatch,
      calTimePeriod,
      isCalAtMinPeriod,
    ],
  );

  const calPeriodZoomOut = useCallback(
    () => {
      // If we can't zoom out any more, return
      if (isCalAtMaxPeriod) {
        return;
      }
      const timePeriod = getParentTimePeriod(calTimePeriod);
      return dispatch(setCalTimePeriod(timePeriod));
    },
    [
      dispatch,
      calTimePeriod,
      isCalAtMaxPeriod,
    ],
  );

  return ({
    calMode,
    calTimePeriod,
    calCurrentDate,
    calStartDate,
    isCalAtMaxPeriod,
    isCalAtMinPeriod,
    calPeriodZoomIn,
    calPeriodZoomOut,
    hoveredSegment,
    setCalCurrentDate: _setCalCurrentDate,
    setCalStartDate: _setCalStartDate,
    setCalTimePeriod: _setCalTimePeriod,
    setHoveredSegment: _setHoveredSegment,
    setCalOpen,
    setCalClosed,
  });
}