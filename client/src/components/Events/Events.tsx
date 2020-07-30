// Libs
import React, { useEffect, useRef, useContext, useMemo } from "react";
import { history } from "../../router";

// styles
import styles from "./styles.module.scss";

// Utils
import { Auth0Context } from "@utils/hooks/useAuth0";
import { useObservable } from "@utils/hooks/useObservable";
import { eventsService } from "@api/services/eventsService";

// Types
import { IEvent } from "@common/types";

// Components
import { EventModal } from "@components/Events/EventModal";
import { Map } from "@components/Map";
import { MapMarker } from "@components/Map/components/MapMarker/MapMarker";
import { MapSearch } from "@components/Events/Search/MapSearch";

// Utils
import { log } from "@utils/Logger";

// Store
import { useMap } from "@stores/MapStore";
import { useEvents } from "@stores/EventStore";

// Constants
import { getNewEventKey } from "@components/Events/utils/getEventKey";
import { AddNewEvent } from "@components/Events/AddNewEvent/AddNewEvent";
import { eventsInstance } from "@components/Events/eventsInstance";

/**
 * Events App
 *
 * References:
 * - https://developers.google.com/maps/documentation/javascript/tutorial
 * - https://stackoverflow.com/questions/42180788/how-to-use-cors-to-implement-javascript-google-places-api-request
 */
const EventsApp: React.FC = () => {

  /**
   * Hooks
   */

  /**
   * ========== Context hooks
   */
  const {
    mapInstance,
    setMapCenterCoords,
    mapCenterCoords,
    centerMapOnClient,
    centerMapOnAddress,
    // activeMarker,
  } = useMap();

  const { activeEvent, isEventOpen } = useEvents();

  const { user } = useContext(Auth0Context);

  /**
   * ========== State hooks
   */
  // const eventsInstance = useMemo(() => new eventsService(), []);

  const events$ = useObservable<IEvent[]>(eventsInstance.onEvents());
  const event$ = useObservable<IEvent>(eventsInstance.onEvent());

  /**
   * Effects
   */
  // Start map loaded on client's address
  // useEffect(() => {
  //   centerMapOnClient();
  // }, []);

  // Get events for logged in user or public
  useEffect(() => {
    if (!user?.sub) {
      return;
    }
    console.log("Fetching all events");
    // eventsInstance.current.getUserEvents(user.sub);
    eventsInstance.getEventsByVis("PUBLIC");
  }, [
    user,
    event$,
  ]);

  /**
   * ========== Container Business Login
   */

  // Handle Active Event change
  useEffect(() => {

    // If Active Event is not set, return
    if (!activeEvent) {
      return;
    }

    // When an Active Event is set, set Map center on it

  }, [
    activeEvent,
  ]);


  // // Center the map to the input address
  // useEffect(() => {
  //   // Don't center until input is long enough to make a prediction
  //   if (
  //     !searchedAddress ||
  //     searchedAddress.length < SEARCH_MIN
  //   ) {
  //     return;
  //   }
  //   // Center Map
  //   centerMapOnAddress(searchedAddress);
  //
  //   // Center Active Marker
  //
  // }, [
  //   searchedAddress,
  // ]);

  console.log("@@ Saved event", events$);

  /**
   * Render fns
   */
  const renderSavedMarkers = () => {
    return events$
      // ?.filter((event) => event.event_id !== activeEvent?.event_id)
      ?.map((event) => {
        return (
          <MapMarker
            key={`marker-${event.event_id}`}
            event={event}
          />
        );
      });
  };

  const renderNewEventMarker = () => {
    if (
      !activeEvent?.address ||
      !activeEvent?.coordinates ||
      !(activeEvent.event_id && activeEvent.event_id.startsWith("new"))
    ) {
      return;
    }
    return (
      <MapMarker
        key={getNewEventKey(activeEvent.address)}
        event={activeEvent}
      />
    );
  };

  /**
   * Return JSX
   */
  return (
    <div className={styles.container}>
      {/*<MapSearch/>*/}
      <AddNewEvent />
      {/*{activeEvent &&*/}
      {/*<EventModal*/}
      {/*  activeEvent={activeEvent}*/}
      {/*/>*/}
      {/*}*/}
      <Map>
        {renderNewEventMarker()}
        {renderSavedMarkers()}
      </Map>
    </div>
  );
};

export { EventsApp };
