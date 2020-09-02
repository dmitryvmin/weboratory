import { CalendarMode, SegmentType } from "@stores/globalStore/stores/calendar/types";
import { TimePeriod } from "@components/Calendar/common/types";
import { calendarConstants } from "@stores/globalStore/stores/calendar/calendarConstants";

const {
  CAL_CURRENT_DATE,
  CAL_START_DATE,
  CAL_MODE,
  CAL_TIME_PERIOD,
  HOVERED_SEGMENT,
} = calendarConstants;

export function setCalTimePeriod(calTimePeriod: TimePeriod) {
  return {
    type: CAL_TIME_PERIOD,
    calTimePeriod,
  };
}

export function setHoveredSegment(hoveredSegment: SegmentType) {
  return {
    type: HOVERED_SEGMENT,
    hoveredSegment,
  };
}

export function setCalMode(calMode: CalendarMode) {
  return {
    type: CAL_MODE,
    calMode,
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
