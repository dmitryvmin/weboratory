// Libs
import React, { FC, useState } from "react";

// App
import { ICalendarProvider, ICalendarState } from "@components/Calendar/store/types";
import { CalendarInitState } from "@components/Calendar/store/constants";
import { CalendarContext } from "./CalendarContext";

export const CalendarProvider: FC<ICalendarProvider> = ({ children }) => {

  const [state, setState] = useState<ICalendarState>(CalendarInitState);

  return (
    <CalendarContext.Provider value={[state, setState] as any}>
      {children}
    </CalendarContext.Provider>
  );
};