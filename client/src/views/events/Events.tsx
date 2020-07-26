// Libs
import React from "react";
import ReactDependentScript from "react-dependent-script";

// Components
import { PageContainer } from "@components/Page";
import { Calendar } from "@components/Calendar";
import { Timeline } from "@components/Timeline";
import { CalendarProvider } from "@components/Calendar/store/CalendarProvider";
import { MapProvider } from "@components/Events/Map/store/MapProvider";
import { EventsApp } from "@components/Events";

// Constants
const googleAPIs = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCY8bbleOprcyzoGw5K23eCm6_jZHUHcbA&libraries=places";

/**
 * Design Page
 */
const Events = () => {
  return (
    <ReactDependentScript scripts={[googleAPIs]}>
      <MapProvider>
        <PageContainer>
          <EventsApp/>
          <CalendarProvider>
            <Calendar/>
            <Timeline/>
          </CalendarProvider>
        </PageContainer>
      </MapProvider>
    </ReactDependentScript>
  );
};

export { Events };
