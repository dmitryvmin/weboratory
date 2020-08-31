// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// App
import {
  queryInViewEventsData,
  setCalCurrentDate,
  setSlideCount,
  setSlideWidth,
  setCalStartDate,
  setCalTimePeriod,
  setSliderXDistance, setCalOpen, setCalClosed,
} from "@stores/globalStore/stores/calendar/calendarActions";
import { TimePeriod } from "@components/Calendar/common/types";
import {
  getCalCurrentDate,
  getSlideCount,
  getSlideWidth,
  getCalStartDate,
  getCalTimePeriod,
  getInViewEventsData, getSliderXDistance, getCalMode, getTimeTable,
} from "@stores/globalStore/stores/calendar/calendarSelectors";

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
  const inViewEventsData = useSelector(getInViewEventsData);
  const slideCount = useSelector(getSlideCount);
  const slideWidth = useSelector(getSlideWidth);
  const calTimePeriod = useSelector(getCalTimePeriod);
  const calCurrentDate = useSelector(getCalCurrentDate);
  const calStartDate = useSelector(getCalStartDate);
  const sliderXDistance = useSelector(getSliderXDistance);
  const calMode = useSelector(getCalMode);
  const timeTable = useSelector(getTimeTable);

  /**
   * Dispatchers
   */
  const _queryInViewEventsData = useCallback(
    () => dispatch(queryInViewEventsData()),
    [dispatch],
  );

  const _setCalCurrentDate = useCallback(
    (date: Date) => dispatch(setCalCurrentDate(date)),
    [dispatch],
  );

  const _setCalStartDate = useCallback(
    (date: Date) => dispatch(setCalStartDate(date)),
    [dispatch],
  );

  const _setSliderXDistance = useCallback(
    (sliderXDistance) => dispatch(setSliderXDistance(sliderXDistance)),
    [dispatch],
  );

  const _setCalTimePeriod = useCallback(
    (timePeriod: TimePeriod) => dispatch(setCalTimePeriod(timePeriod)),
    [dispatch],
  );

  const _setSlideCount = useCallback(
    (slideCount: number) => dispatch(setSlideCount(slideCount)),
    [dispatch],
  );

  const _setSlideWidth = useCallback(
    (slideWidth: number) => dispatch(setSlideWidth(slideWidth)),
    [dispatch],
  );

  const _setCalOpen = useCallback(
    () => dispatch(setCalOpen()),
    [dispatch],
  );

  const _setCalClosed = useCallback(
    () => dispatch(setCalClosed()),
    [dispatch],
  );

  return ({
    calMode,
    inViewEventsData,
    calTimePeriod,
    calCurrentDate,
    calStartDate,
    slideCount,
    slideWidth,
    sliderXDistance,
    timeTable,
    queryInViewEventsData: _queryInViewEventsData,
    setCalCurrentDate: _setCalCurrentDate,
    setCalStartDate: _setCalStartDate,
    setCalTimePeriod: _setCalTimePeriod,
    setSlideCount: _setSlideCount,
    setSlideWidth: _setSlideWidth,
    setSliderXDistance: _setSliderXDistance,
    setCalOpen: _setCalOpen,
    setCalClosed: _setCalClosed,
  });
}