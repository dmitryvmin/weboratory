import { CalendarStateType } from "@stores/globalStore/stores/calendar/types";
import { getToday } from "@utils/date/getToday";

const calenderInitialState: CalendarStateType = {
  // calMode: "DOCKED",
  calMode: "CLOSED",
  calTimePeriod: "DAY",
  calStartDate: getToday(),
  calCurrentDate: getToday(),
};

export {calenderInitialState};
