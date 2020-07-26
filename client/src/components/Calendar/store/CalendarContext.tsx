import { createContext } from "react";
import { ICalendarContext } from "@components/Calendar/store/types";
import { CalendarInitState } from "@components/Calendar/store/constants";

export const CalendarContext = createContext<ICalendarContext>([CalendarInitState, () => {
}]);