import { TimePeriod } from "@components/Calendar/common/types";
import {
  SET_CAL_CURRENT_DATE, SET_CAL_SLIDE_COUNT,
  SET_CAL_START_DATE,
  SET_CAL_TIME_PERIOD,
} from "@stores/globalStore/constants/calendar";

function setCalTimePeriod(calTimePeriod: TimePeriod) {
  return {
    type: SET_CAL_TIME_PERIOD,
    calTimePeriod,
  };
}

function setCalStartDate(calStartDate: Date) {
  return {
    type: SET_CAL_START_DATE,
    calStartDate,
  };
}

function setCalCurrentDate(calCurrentDate: Date) {
  return {
    type: SET_CAL_CURRENT_DATE,
    calCurrentDate,
  };
}

function setCalSlideCount(calSlideCount: number) {
  return {
    type: SET_CAL_SLIDE_COUNT,
    calSlideCount,
  };
}

export {
  setCalTimePeriod,
  setCalStartDate,
  setCalCurrentDate,
  setCalSlideCount,
};
