// Libs
import React from "react";
import ReactDependentScript from "react-dependent-script";

// Components
import { PageContainer } from "@components/Page";
import { Calendar } from "@components/Calendar";
import { EventsApp } from "@components/Events";

// App
import { CalendarProvider } from "@components/Calendar/store";
import { EventsProvider } from "@stores/EventStore";
import { GOOGLE_MAPS_API } from "../../constants";
import { Timeline } from "@components/Controls/CalendarMenu";

/**
 * Events Page
 */
const Events = () => {
  return (
    <ReactDependentScript scripts={[GOOGLE_MAPS_API]}>
      <CalendarProvider>
        <EventsProvider>
          <PageContainer>
            <EventsApp/>
            <Calendar/>
            <Timeline/>
          </PageContainer>
        </EventsProvider>
      </CalendarProvider>
    </ReactDependentScript>
  );
};

export { Events };
