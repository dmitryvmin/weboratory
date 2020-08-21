// Libs
import React, { FC, useState } from "react";

// Events Data store
import { EventsDataState } from "@stores/EventsDataStore/types";
import { EventsDataContext } from ".";
import { initEventsDataState } from "@stores/EventsDataStore/constants";

/**
 * Events Data Context Provider
 */
const EventsDataProvider = ({ children }) => {

  const [state, dispatch] = useState<EventsDataState>(initEventsDataState);

  return (
    <EventsDataContext.Provider value={[state, dispatch]}>
      {children}
    </EventsDataContext.Provider>
  );
};

export { EventsDataProvider };
