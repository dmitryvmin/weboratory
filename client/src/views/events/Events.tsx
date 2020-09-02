// Libs
import React from "react";
import ReactDependentScript from "react-dependent-script";

// Components
import { PageContainer } from "@components/Page";
import { Calendar } from "@components/Calendar";
import { EventsApp } from "@components/Events";
import { TimelineMenu } from "@components/Controls/TimelineMenu";

// Stores
import { EventsProvider } from "@stores/EventStore";

// Constants
import { GOOGLE_MAPS_API } from "../../constants";

/**
 * Events Page
 */
const Events = () => {
  return (
    <ReactDependentScript scripts={[GOOGLE_MAPS_API]}>
      <EventsProvider>
        <PageContainer>
          <EventsApp/>
          <Calendar/>
          <TimelineMenu/>
        </PageContainer>
      </EventsProvider>
    </ReactDependentScript>
  );
};

export { Events };
