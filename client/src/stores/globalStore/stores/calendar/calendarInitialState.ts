import { getToday } from "@components/Calendar/utils/getToday";
import { CalendarStateType } from "@stores/globalStore/stores/calendar/types";

const calenderInitialState: CalendarStateType = {
  calMode: "DOCKED",
  calTimePeriod: "DAY",
  calStartDate: getToday(),
  calCurrentDate: getToday(),
  slideCount: 1,
  slideWidth: 300,
  inViewEventsData: undefined,
  sliderXDistance: undefined,
};

export {calenderInitialState};
