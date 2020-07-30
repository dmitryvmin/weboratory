import { createContext } from "react";
import { ICalendarContext } from "@stores/CalendarStore/types";
import { CalendarInitState } from "@stores/CalendarStore/constants";

export const CalendarContext = createContext<ICalendarContext>([CalendarInitState, () => {
}]);