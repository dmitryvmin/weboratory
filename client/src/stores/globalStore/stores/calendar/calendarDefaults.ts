import { getToday } from "@components/Calendar/utils/getToday";
import { CalendarStateType } from "@stores/globalStore/stores/calendar/types";

const calenderInitialState: CalendarStateType = {
  calMode: "DOCKED",
  calTimePeriod: "DAY",
  calStartDate: getToday(),
  calCurrentDate: getToday(),
  slideCount: undefined,
  slideWidth: undefined,
  inViewEventsData: undefined,
  sliderXDistance: undefined,
  timeTable: undefined,
  timeTableIntervals: undefined,
};

export {calenderInitialState};
