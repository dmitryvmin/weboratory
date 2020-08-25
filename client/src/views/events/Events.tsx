// Libs
import React from "react";
import ReactDependentScript from "react-dependent-script";

// Components
import { PageContainer } from "@components/Page";
import { Calendar } from "@components/Calendar";
import { Timeline } from "@components/Timeline";
import { EventsApp } from "@components/Events";

// App
import { CalendarProvider } from "@components/Calendar/store";
import { MapProvider } from "@stores/MapStore";
import { EventsProvider } from "@stores/EventStore";
import { GOOGLE_MAPS_API } from "../../constants";
import { EventsDataProvider } from "@stores/EventsDataStore";

/**
 * Events Page
 */
const Events = () => {
  return (
    <ReactDependentScript scripts={[GOOGLE_MAPS_API]}>
      <CalendarProvider>
      <EventsProvider>
        <MapProvider>
          <PageContainer>
            <EventsApp/>
              <EventsDataProvider>
                <Calendar/>
              </EventsDataProvider>
              <Timeline/>
          </PageContainer>
        </MapProvider>
      </EventsProvider>
      </CalendarProvider>
    </ReactDependentScript>
  );
};

export { Events };
