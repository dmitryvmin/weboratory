// Libs
import { createContext } from "react";

// App
import { CalendarContextInterface } from "./types";
import { CalendarInitState } from "@components/Calendar/constants";

const CalendarContext = createContext<CalendarContextInterface>([CalendarInitState, () => {
}]);

export { CalendarContext };
