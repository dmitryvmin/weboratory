// Libs
import { useContext } from "react";

// App
import { CalendarContext } from "@stores/CalendarStore/CalendarContext";
import { CalendarContextInterface, UseCalendar } from "@stores/CalendarStore/types";
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
  function setCenterTimeMarker(timeMarker) {
    setState((s) => ({
      ...s,
      centerTimeMarker: timeMarker,
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
    const period = TimeScaleMap[newTimeScaleIdx];

    setState((s) => ({
      ...s,
      period,
    }));
  }

  function zoomOut() {

    // If we can't zoom out any more, return
    if (isLastPeriod()) {
      return;
    }

    const curTimeScaleIdx = TimeScaleMap.indexOf(state.timeScale);
    const newTimeScaleIdx = curTimeScaleIdx + 1;
    const period = TimeScaleMap[newTimeScaleIdx];

    setState((s) => ({
      ...s,
      period,
    }));
  }

  function moveLeft(xPosition: number) {
    setState((s) => ({
      ...s,
      xPosition,
    }));
  }

  function moveRight(xPosition: number) {
    setState((s) => ({
      ...s,
      xPosition,
    }));
  }

  /**
   * useCalendar hook state and functions
   */
  return {
    isOpen: state.isOpen,
    timeScale: state.timeScale,
    centerTimeMarker: state.centerTimeMarker,
    xPosition: state.xPosition,
    setCalendarIsOpen,
    zoomIn,
    zoomOut,
    isFirstPeriod,
    isLastPeriod,
    moveLeft,
    moveRight,
    setCenterTimeMarker,
  };
};

export { useCalendar };
