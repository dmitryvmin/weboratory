// Libs
import { useContext, useState } from "react";

// App
import { CalendarContext } from "./CalendarContext";
import { CalendarContextInterface, CalendarState, UseCalendar } from "./types";
import { getTimeScaleFrom } from "./utils/getTimeScaleFrom";
import { TimePeriodMap } from "@components/Calendar/constants";

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
    return TimePeriodMap.indexOf(state.timePeriod) === 0;
  }

  function isLastPeriod() {
    return TimePeriodMap.indexOf(state.timePeriod) === (TimePeriodMap.length - 1);
  }

  function zoomIn() {

    // If we can't zoom in any more, return
    if (isFirstPeriod()) {
      return;
    }

    const timePeriod = getTimeScaleFrom(state.timePeriod, -1);

    setState((s): CalendarState => ({
      ...s,
      timePeriod,
    }));
  }

  function zoomOut() {

    // If we can't zoom out any more, return
    if (isLastPeriod()) {
      return;
    }

    const timePeriod = getTimeScaleFrom(state.timePeriod, 1);

    setState((s): CalendarState => ({
      ...s,
      timePeriod,
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

  // function setLeftBufferRef(leftBufferRef: HTMLDivElement) {
  //   setState((s): CalendarState => ({
  //     ...s,
  //     leftBufferRef,
  //   }));
  // }
  //
  // function setRightBufferRef(rightBufferRef: HTMLDivElement) {
  //   setState((s): CalendarState => ({
  //     ...s,
  //     rightBufferRef,
  //   }));
  // }

  /**
   * useCalendar hook state and functions
   */
  return {
    isOpen: state.isOpen,
    timePeriod: state.timePeriod,
    calendarMarker: state.calendarMarker,
    xPosition: state.xPosition,
    intervalData: state.intervalData,
    slideCount: state.slideCount,
    slideWidth: state.slideWidth,
    // leftBufferRef: state.leftBufferRef,
    // rightBufferRef: state.rightBufferRef,
    setCalendarIsOpen,
    zoomIn,
    zoomOut,
    isFirstPeriod,
    isLastPeriod,
    moveLeft,
    moveRight,
    setCalendarMarker,
    setIntervalData,
    setSlideCount,
    setSlideWidth,
    // setLeftBufferRef,
    // setRightBufferRef,
  };
};

export { useCalendar };
