// Libs
import React, { FC, useState } from "react";

// App
import { CalendarProviderInterface, CalendarState } from "@stores/CalendarStore/types";
import { CalendarInitState } from "@stores/CalendarStore/constants";
import { CalendarContext } from "./CalendarContext";

const CalendarProvider: FC<CalendarProviderInterface> = ({ children }) => {

  const [state, setState] = useState<CalendarState>(CalendarInitState);

  return (
    <CalendarContext.Provider value={[state, setState] as any}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarProvider };
