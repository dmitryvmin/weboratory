// Libs
import { useContext } from "react";

// App
import { CalendarContext } from "@stores/CalendarStore/CalendarContext";
import { CalendarContextInterface, CalendarState, UseCalendar } from "@stores/CalendarStore/types";
import { TimeScaleMap } from "@stores/CalendarStore/constants";

/**
 * Calendar Context Facade
 */
const useCalendar = (): UseCalendar => {

  /**
   * Hooks
   */
  const [state, setState] = useContext<CalendarContextInterface>(CalendarContext);

  /**
   * Public functions
   */
  function setCalendarMarker(calendarMarker) {
    setState((s) => ({
      ...s,
      calendarMarker,
    }));
  }

  function toggleCalendar() {
    setState((s) => ({
      ...s,
      isOpen: !s.isOpen,
    }));
  };

  function setCalendarIsOpen(isOpen: boolean) {
    setState((s) => ({
      ...s,
      isOpen,
    }));
  };

  function isFirstPeriod() {
    return TimeScaleMap.indexOf(state.timeScale) === 0;
  }

  function isLastPeriod() {
    return TimeScaleMap.indexOf(state.timeScale) === (TimeScaleMap.length - 1);
  }

  function zoomIn() {

    // If we can't zoom in any more, return
    if (isFirstPeriod()) {
      return;
    }

    const curTimeScaleIdx = TimeScaleMap.indexOf(state.timeScale);
    const newTimeScaleIdx = curTimeScaleIdx - 1;
    const timeScale = TimeScaleMap[newTimeScaleIdx];

    setState((s): CalendarState => ({
      ...s,
      timeScale,
    }));
  }

  function zoomOut() {

    // If we can't zoom out any more, return
    if (isLastPeriod()) {
      return;
    }

    const curTimeScaleIdx = TimeScaleMap.indexOf(state.timeScale);
    const newTimeScaleIdx = curTimeScaleIdx + 1;
    const timeScale = TimeScaleMap[newTimeScaleIdx];

    setState((s): CalendarState => ({
      ...s,
      timeScale,
    }));
  }

  function moveLeft(xPosition: number) {
    setState((s): CalendarState => ({
      ...s,
      xPosition,
    }));
  }

  function moveRight(xPosition: number) {
    setState((s): CalendarState => ({
      ...s,
      xPosition,
    }));
  }

  // function setSliderRef(sliderRef) {
  //   setState((s): CalendarState => ({
  //     ...s,
  //     sliderRef,
  //   }));
  // }

  function setIntervalData(intervalData) {
    setState((s): CalendarState => ({
      ...s,
      intervalData,
    }));
  }

  /**
   * useCalendar hook state and functions
   */
  return {
    isOpen: state.isOpen,
    timeScale: state.timeScale,
    calendarMarker: state.calendarMarker,
    xPosition: state.xPosition,
    intervalData: state.intervalData,
    // sliderRef: state.sliderRef,
    setCalendarIsOpen,
    zoomIn,
    zoomOut,
    isFirstPeriod,
    isLastPeriod,
    moveLeft,
    moveRight,
    setCalendarMarker,
    setIntervalData,
    // setSliderRef,
  };
};

export { useCalendar };
