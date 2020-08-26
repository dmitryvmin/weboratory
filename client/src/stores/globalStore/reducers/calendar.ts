import { SET_CAL_CURRENT_DATE, SET_CAL_START_DATE, SET_CAL_TIME_PERIOD } from "@stores/globalStore/constants/calendar";
import { getIntervalEventsDataMap } from "@components/Calendar/utils/getIntervalEventsDataMap";
import { generateEventsMockData } from "@components/Calendar/__mocks__/generateEventsMockData";
import { getToday } from "@components/Calendar/utils/getToday";

const mockData = generateEventsMockData();

const initialState = {
  calTimePeriod: "DAY",
  calStartDate: getToday(),
  calCurrentDate: getToday(),
  calSlideCount: 1,
};

function calendarReducer(state = initialState, action) {

  let eventsData;

  switch (action.type) {
    case SET_CAL_TIME_PERIOD:

      eventsData = getIntervalEventsDataMap(
        action.calTimePeriod,
        state.calCurrentDate,
        state.calSlideCount,
        mockData,
      );

      return ({
        ...state,
        calTimePeriod: action.calTimePeriod,
        eventsData: eventsData,
      });

    case SET_CAL_START_DATE:
      return ({
        ...state,
        calStartDate: action.calStartDate,
      });

    case SET_CAL_CURRENT_DATE:

      eventsData = getIntervalEventsDataMap(
        state.calTimePeriod,
        action.calCurrentDate,
        state.calSlideCount,
        mockData,
      );

      return ({
        ...state,
        calCurrentDate: action.calCurrentDate,
        eventsData,
      });

    default:
      return state;
  }
}

export { calendarReducer };