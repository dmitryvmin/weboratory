// Libs
import { useContext } from "react";

// Components
import { CalendarContext } from "@stores/CalendarStore/CalendarContext";
import { ICalendarContext, UseCalendar } from "@stores/CalendarStore/types";
import { TimeScaleEnum } from "@stores/CalendarStore/constants";

/**
 * Calendar Context Facade
 */
const useCalendar = (): UseCalendar => {

  /**
   * Hooks
   */
  const [state, setState] = useContext<ICalendarContext>(CalendarContext);

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
    return TimeScaleEnum.indexOf(state.timeScale) === 0;
  }

  function isLastPeriod() {
    return TimeScaleEnum.indexOf(state.timeScale) === (TimeScaleEnum.length - 1);
  }

  function zoomIn() {

    // If we can't zoom in any more, return
    if (isFirstPeriod()) {
      return;
    }

    const curTimeScaleIdx = TimeScaleEnum.indexOf(state.timeScale);
    const newTimeScaleIdx = curTimeScaleIdx - 1;
    const period = TimeScaleEnum[newTimeScaleIdx];

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

    const curTimeScaleIdx = TimeScaleEnum.indexOf(state.timeScale);
    const newTimeScaleIdx = curTimeScaleIdx + 1;
    const period = TimeScaleEnum[newTimeScaleIdx];

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
