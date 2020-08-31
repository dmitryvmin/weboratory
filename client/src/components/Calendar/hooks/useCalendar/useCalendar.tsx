// Libs
import { useContext } from "react";

// App
import { TimePeriodMap } from "@components/Calendar/constants";
import { UseCalendar } from "@components/Calendar/hooks/useCalendar/types";
import { CalendarContextInterface, CalendarState } from "@components/Calendar/store/types";
import { CalendarContext } from "@components/Calendar/store";
import { getChildTimePeriod } from "@components/Calendar/utils/getChildTimePeriod";
import { getParentTimePeriod } from "@components/Calendar/utils/getParentTimePeriod";

/**
 * Calendar Context Facade
 */
const useCalendar = (): UseCalendar => {

  /**
   * Hooks
   */
  const [state, setState] = useContext<CalendarContextInterface>(CalendarContext);

  const {
    isCalendarOpen,
    isFullScreen,
    timePeriod,
    xDistance,
    intervalData,
    slideCount,
    slideWidth,
    startingDate,
    currentDate,
  } = state;

  /**
   * Public functions
   */
  function toggleCalendar(isOpen) {
    const newVisState = {
      isFullScreen,
      isCalendarOpen,
    };

    if (isOpen) {
      if (isFullScreen === false && isCalendarOpen === false) {
        newVisState.isCalendarOpen = true;
      }
      else if (isFullScreen === false && isCalendarOpen === true) {
        newVisState.isFullScreen = true;
      }
    }
    else {
      if (isFullScreen === true) {
        newVisState.isFullScreen = false;
      }
      else {
        newVisState.isCalendarOpen = false;
      }
    }

    setState((s) => ({
        ...s,
        ...newVisState,
      }),
    );
  }

  function setCalendarIsOpen(_isOpen: boolean) {
    setState((s) => ({
      ...s,
      isOpen: _isOpen,
    }));
  }

  function setIsFullScreen(_isFullScreen: boolean) {
    setState((s) => ({
      ...s,
      isFullScreen: _isFullScreen,
    }));
  }

  function isAtMaxPeriod() {
    return TimePeriodMap[TimePeriodMap.indexOf(state.timePeriod)] === "YEAR";
  }

  function isAtMinPeriod() {
    return TimePeriodMap[TimePeriodMap.indexOf(state.timePeriod)] === "HOUR";
  }

  function zoomIn() {

    // If we can't zoom in any more, return
    if (isAtMinPeriod()) {
      return;
    }

    const timePeriod = getChildTimePeriod(state.timePeriod);

    setState((s): CalendarState => ({
      ...s,
      timePeriod,
    }));
  }

  function zoomOut() {

    // If we can't zoom out any more, return
    if (isAtMaxPeriod()) {
      return;
    }

    const timePeriod = getParentTimePeriod(state.timePeriod);

    setState((s): CalendarState => ({
      ...s,
      timePeriod,
    }));
  }

  function setXDistance(_xDistance) {
    setState((s): CalendarState => ({
      ...s,
      xDistance: _xDistance,
    }));
  }

  function setIntervalData(intervalData) {
    setState((s): CalendarState => ({
      ...s,
      intervalData,
    }));
  }

  // Number of slides to display in viewport
  function setSlideCount(slideCount) {
    setState((s): CalendarState => ({
      ...s,
      slideCount,
    }));
  }

  function setSlideWidth(slideWidth: number) {
    setState((s): CalendarState => ({
      ...s,
      slideWidth,
    }));
  }

  function setStartingDate(startingDate: Date) {
    setState((s): CalendarState => ({
      ...s,
      startingDate,
    }));
  }

  function setCurrentDate(currentDate: Date) {
    setState((s): CalendarState => ({
      ...s,
      currentDate,
    }));
  }

  /**
   * useCalendar hook state and functions
   */
  return {
    isCalendarOpen,
    isFullScreen,
    timePeriod,
    xDistance,
    intervalData,
    slideCount,
    slideWidth,
    startingDate,
    currentDate,
    zoomIn,
    zoomOut,
    isAtMinPeriod,
    isAtMaxPeriod,
    setXDistance,
    setIntervalData,
    setSlideCount,
    setSlideWidth,
    setStartingDate,
    setCurrentDate,
    toggleCalendar,
    setCalendarIsOpen,
    setIsFullScreen,
  };
};

export { useCalendar };
