// Libs
import { createContext } from "react";

// App
import { CalendarContextInterface } from "@stores/CalendarStore/types";
import { CalendarInitState } from "@stores/CalendarStore/constants";

const CalendarContext = createContext<CalendarContextInterface>([CalendarInitState, () => {
}]);

export { CalendarContext };
