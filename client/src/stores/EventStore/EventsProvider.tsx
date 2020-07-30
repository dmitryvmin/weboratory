// Libs
import React, { FC, useState } from "react";

// Events store
import { IEventsProvider, IEventsState } from "./types";
import { EventsContext } from "./EventsContext";
import { EventsInitialState } from "./constants";

/**
 * Events Context Provider
 */
const EventsProvider: FC<IEventsProvider> = ({ children }) => {

  const [state, setState] = useState<IEventsState>(EventsInitialState);

  return (
    <EventsContext.Provider value={[state, setState]}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider };
