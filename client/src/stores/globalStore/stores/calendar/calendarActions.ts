import { TimePeriod } from "@components/Calendar/common/types";
import {
  CAL_CURRENT_DATE,
  CAL_START_DATE,
  SLIDE_COUNT,
  SLIDE_WIDTH,
  SLIDER_X_DISTANCE,
  QUERY_IN_VIEW_EVENTS_DATA,
  IN_VIEW_EVENTS_DATA, CAL_MODE,
  TOGGLE_CAL_OPEN,
  TOGGLE_CAL_CLOSED, CAL_TIME_PERIOD, CAL_TIMETABLE, TIMETABLE_INTERVALS,
} from "@stores/globalStore/stores/calendar/calendarConstants";
import { CalendarMode } from "@stores/globalStore/stores/calendar/types";

export function setCalTimePeriod(calTimePeriod: TimePeriod) {
  return {
    type: CAL_TIME_PERIOD,
    calTimePeriod,
  };
}

export function setTimeTable(timeTable) {
  return {
    type: CAL_TIMETABLE,
    timeTable,
  };
}

export function setTimeTableIntervals(timeTableIntervals) {
  return {
    type: TIMETABLE_INTERVALS,
    timeTableIntervals,
  };
}

export function setCalMode(calMode: CalendarMode) {
  return {
    type: CAL_MODE,
    calMode,
  };
}

export function setCalOpen() {
  return {
    type: TOGGLE_CAL_OPEN,
  };
}

export function setCalClosed() {
  return {
    type: TOGGLE_CAL_CLOSED,
  };
}

export function setCalStartDate(calStartDate: Date) {
  return {
    type: CAL_START_DATE,
    calStartDate,
  };
}

export function setCalCurrentDate(calCurrentDate: Date) {
  return {
    type: CAL_CURRENT_DATE,
    calCurrentDate,
  };
}

export function setSlideCount(slideCount: number) {
  return {
    type: SLIDE_COUNT,
    slideCount,
  };
}

export function setSlideWidth(slideWidth: number) {
  return {
    type: SLIDE_WIDTH,
    slideWidth,
  };
}

export function setInViewEventsData(inViewEventsData) {
  return {
    type: IN_VIEW_EVENTS_DATA,
    inViewEventsData,
  };
}

export function setSliderXDistance(sliderXDistance) {
  return {
    type: SLIDER_X_DISTANCE,
    sliderXDistance,
  };
}

export function queryInViewEventsData() {
  return {
    type: QUERY_IN_VIEW_EVENTS_DATA,
  };
}
