// Libs
import { useContext } from "react";

// Components
import { CalendarContext } from "@stores/CalendarStore/CalendarContext";
import { ICalendarContext } from "@stores/CalendarStore/types";
import { CalendarPeriod } from "@stores/CalendarStore/constants";

/**
 * Calendar Context Facade
 */
const useCalendar = () => {

  /**
   * Hooks
   */
  const [state, setState] = useContext<ICalendarContext>(CalendarContext);

  /**
   * Effects
   */

  /**
   * Public store fns
   */
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
    return CalendarPeriod.indexOf(state.period) === 0;
  }

  function isLastPeriod() {
    return CalendarPeriod.indexOf(state.period) === (CalendarPeriod.length - 1);
  }

  function zoomIn() {

    // If we can't zoom in any more, return
    if (isFirstPeriod()) {
      return;
    }

    const curPeriodIdx = CalendarPeriod.indexOf(state.period);
    const newPeriodIdx = curPeriodIdx - 1;
    const period = CalendarPeriod[newPeriodIdx];

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

    const curPeriodIdx = CalendarPeriod.indexOf(state.period);
    const newPeriodIdx = curPeriodIdx + 1;
    const period = CalendarPeriod[newPeriodIdx];

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
   * Hook functions
   */
  return {
    isOpen: state.isOpen,
    period: state.period,
    activeIndex: state.activeIndex,
    xPosition: state.xPosition,
    setCalendarIsOpen,
    zoomIn,
    zoomOut,
    isFirstPeriod,
    isLastPeriod,
    moveLeft,
    moveRight,
  };
};

export { useCalendar };
