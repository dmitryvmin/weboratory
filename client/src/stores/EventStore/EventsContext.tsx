// Libs
import { createContext } from "react";

// Events store
import { IEventsContext } from "./types";
import { EventsInitialState } from "./constants";

const EventsContext = createContext<IEventsContext>([EventsInitialState, () => {}]);

export { EventsContext };
