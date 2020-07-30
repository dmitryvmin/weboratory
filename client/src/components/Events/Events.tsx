// Libs
import React, { useEffect, useRef, useContext } from "react";
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
import { MapSearch } from "@components/Map/components/MapSearch/MapSearch";

// Utils
import { log } from "@utils/Logger";

// Constants
import { getNewMarkerId } from "@components/Events/utils/getNewMarkerId";
import { AnimatePresence } from "framer-motion";
import { useMap } from "../../stores/MapStore";
import { useEvents } from "@stores/EventStore";

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
    activeMarker,
  } = useMap();

  const { isEventOpen } = useEvents();

  const { user } = useContext(Auth0Context);

  /**
   * ========== State hooks
   */
  const eventsInstance = useRef(new eventsService());

  const events$ = useObservable<IEvent[]>(eventsInstance.current.onEvents());

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
    // eventsInstance.current.getUserEvents(user.sub);
    eventsInstance.current.getEventsByVis("PUBLIC");
  }, [
    user,
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

  /**
   * Render fns
   */
  const renderSavedMarkers = () => {
    return events$?.map((event) =>
      <MapMarker
        key={`marker-${event.event_id}`}
        event={event}
      />,
    );
  };

  const renderActiveMarker = () => {
    if (!activeMarker) {
      return;
    }
    return (
      <MapMarker
        key={getNewMarkerId(activeMarker.address)}
        event={activeMarker}
      />
    );
  };

  const renderMarkers = () => {
    const savedMarkers = renderSavedMarkers();
    const activeMarker = renderActiveMarker();
    return [savedMarkers, activeMarker].map((m) => m);
  };

  /**
   * Return JSX
   */
  return (
    <div className={styles.container}>
      <MapSearch/>
      <EventModal/>
      <Map>
        {renderActiveMarker()}
        {/*{renderMarkers()}*/}
        {renderSavedMarkers()}
        {/*{renderActiveMarker()}*/}
      </Map>
    </div>
  );
};

export { EventsApp };
