import { getToday } from "@components/Calendar/utils/getToday";

const initialState = {
  eventModalIsOpen: false,
  eventsData: [],
  calTimePeriod: "DAY",
  calStartDate: getToday(),
  calCurrentDate: getToday(),
  calSlideCount: 1,

  // isCalendarOpen: true,
  // isFullScreen: false,
  // xDistance: {
  //   distance: undefined,
  //   velocity: undefined,
  // },
  // intervalData: undefined,
  // slideCount: 1,
  // slideWidth: 400,
};

export { initialState };