// Libs
import React from "react";
import ReactDependentScript from "react-dependent-script";

// Components
import { PageContainer } from "@components/Page";
import { Calendar } from "@components/Calendar";
import { Timeline } from "@components/Timeline";
import { EventsApp } from "@components/Events";

// Stores
import { CalendarProvider } from "@stores/CalendarStore";
import { MapProvider } from "@stores/MapStore";
import { EventsProvider } from "@stores/EventStore";

// Constants
import { GOOGLE_MAPS_API } from "../../constants";

import { generateEventsMockData } from "@components/Calendar/__mocks__/generateEventsMockData";
const mockData = generateEventsMockData();

/**
 * Events Page
 */
const Events = () => {
  return (
    <ReactDependentScript scripts={[GOOGLE_MAPS_API]}>
      <EventsProvider>
        <MapProvider>
          <PageContainer>
            <EventsApp/>
            <CalendarProvider>
              <Calendar eventsData={mockData}/>
              <Timeline/>
            </CalendarProvider>
          </PageContainer>
        </MapProvider>
      </EventsProvider>
    </ReactDependentScript>
  );
};

export { Events };
