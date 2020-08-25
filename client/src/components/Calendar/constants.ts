// App
import { CalendarState } from "@components/Calendar/store/types";
import { getToday } from "@components/Calendar/utils/getToday";
import { TimePeriod } from "@components/Calendar/common/types";

export const SLIDER_MARGIN = 20;

export const SLIDER_BUFFER = 1;

export const CalendarInitState: CalendarState = {
  timePeriod: "DAY",
  isCalendarOpen: true,
  isFullScreen: false,
  xDistance: {
    distance: undefined,
    velocity: undefined,
  },
  startingDate: getToday(),
  currentDate: getToday(),
  intervalData: undefined,
  slideCount: 1,
  slideWidth: 400,
};

export const TimeFormatMap: {[key in TimePeriod]: string} = {
  "SECOND": "ss",
  "MINUTE": "mm",
  "HOUR": "hh",
  "DAY": "dd",
  "MONTH": "mm",
  "YEAR": "yyyy",
};

export const TimePeriodMap: TimePeriod[] = [
  "YEAR",
  "MONTH",
  "DAY",
  "HOUR",
  "MINUTE",
];

export const DateFormatMap: {[key in TimePeriod]: string} = {
  "SECOND": "p",
  "MINUTE": "p",
  "HOUR": "p",
  "DAY": "EEE, do",
  "MONTH": "MMM",
  "YEAR": "yyyy",
}

export const CurrentDateFormatMap: {[key in TimePeriod]: string} = {
  "SECOND": "MMM do, p yyy h:m aaaa",
  "MINUTE": "MMM do, p h:m aaaa yyy",
  "HOUR": "MMM do, h aaaa yyy",
  "DAY": "MMM do, yyy",
  "MONTH": "MMM yyy",
  "YEAR": "MMM",
}
