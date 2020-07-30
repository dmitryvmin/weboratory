// Libs
import React, { FC, useState } from "react";

// App
import { ICalendarProvider, ICalendarState } from "@stores/CalendarStore/types";
import { CalendarInitState } from "@stores/CalendarStore/constants";
import { CalendarContext } from "./CalendarContext";

export const CalendarProvider: FC<ICalendarProvider> = ({ children }) => {

  const [state, setState] = useState<ICalendarState>(CalendarInitState);

  return (
    <CalendarContext.Provider value={[state, setState] as any}>
      {children}
    </CalendarContext.Provider>
  );
};