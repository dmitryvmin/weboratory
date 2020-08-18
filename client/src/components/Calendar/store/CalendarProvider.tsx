// Libs
import React, { FC, useState } from "react";

// App
import { CalendarContext } from "./CalendarContext";
import { CalendarProviderInterface, CalendarState } from "@components/Calendar/store/types";
import { CalendarInitState } from "@components/Calendar/constants";

const CalendarProvider: FC<CalendarProviderInterface> = ({ children }) => {

  const [state, setState] = useState<CalendarState>(CalendarInitState);

  return (
    <CalendarContext.Provider value={[state, setState] as any}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarProvider };
