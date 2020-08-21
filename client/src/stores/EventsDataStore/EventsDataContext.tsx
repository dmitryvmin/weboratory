// Libs
import { createContext } from "react";

// App
import { EventsDataContextType } from "./types";

const EventsDataContext = createContext<EventsDataContextType>([{}, () => {}] as any);

export { EventsDataContext };
