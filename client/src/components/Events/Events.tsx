// Libs
import React, { useEffect, SyntheticEvent, useState, useRef, Fragment, useContext } from "react";
import { Marker } from "react-mapbox-gl";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { AnimatePresence } from "framer-motion";
import invariant from "invariant";
import { history } from "../../router";

// styles
import styles from "./styles.module.scss";
import markerStyles from "./MapMarker/styles.module.scss";

// Utils
import { Auth0Context } from "@utils/hooks/useAuth0";
import { useObservable } from "@utils/hooks/useObservable";
import { eventsService } from "@api/services/eventsService";

// Types
import { IEvent } from "@common/types";
import { TLngLat, TMapEvent } from "@components/Events/types";

// Components

import { SearchInput } from "@components/Events/MapSearch/SearchInput";
import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";
import { EventModal } from "@components/Events/EventModal";
import { Map } from "@components/Events/Map";

// Event utils
import { useAddressPredictions } from "@components/Events/hooks/useAddressPredictions";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { useMap } from "@components/Events/Map/store/useMap";
import { haveCoordsChanged } from "@components/Events/utils/haveCoordsChanged";
import { log } from "@utils/Logger";
import { useWindowSize } from "@utils/hooks/useWindowSize";

/**
 * Events App
 *
 * References:
 * - https://developers.google.com/maps/documentation/javascript/tutorial
 * - https://stackoverflow.com/questions/42180788/how-to-use-cors-to-implement-javascript-google-places-api-request
 */
const EventsApp: React.FC = () => {

  /**
   * State
   */
  const [address, setAddress] = useState<string>("");

  const [activeEvent, setActiveEvent] = useState<TMapEvent | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);

  const [isEventOpen, setEventOpen] = useState<boolean>(false);

  /**
   * Hooks
   */
  const predictions = useAddressPredictions(address);

  const { mapInstance, setMapCenter, mapCenter } = useMap();

  const eventsInstance = useRef(new eventsService());

  const events$ = useObservable<IEvent[]>(eventsInstance.current.onEvents());

  const { user } = useContext(Auth0Context);

  const { windowHeight } = useWindowSize();

  /**
   * Effects
   */
  // Get events
  useEffect(() => {
    // const events = user && user["https://weboratory.com/user_metadata"]?.events;
    // if (!events?.length || !eventsInstance.current) {
    //   return;
    // }
    // eventsInstance.current.setEvents(events);
    if (!user?.sub) {
      return;
    }
    // eventsInstance.current.getUserEvents(user.sub);
    eventsInstance.current.getEventsByVis("PUBLIC");
  }, [
    user,
  ]);

  // Center the map to the input address
  useEffect(() => {
    if (address?.length < 10) {
      return;
    }
    geocodeQuery(address).then((newCoords) => {

      if (!haveCoordsChanged(newCoords, mapCenter)) {
        return;
      }

      setMapCenter(newCoords);

      // mapInstance.flyTo({
      //   center: getLngLatTuple(newCoords),
      //   speed: 1,
      //   curve: 1,
      // });

    });
  }, [
    address,
  ]);

  // when activeMarker is set
  useEffect(() => {
    if (!activeEvent) {
      return;
    }

    history.push(`/events?eventId=${activeEvent.event_id}`);

    // Hide PredictionsDropdown
    setAddress("");

    // Hide MapSearch
    setIsSearchOpen(false);

    // Re-center the map in the upper half
    // const lngLat = getLngLatArray(activeMarker.latLng);
    // const { x, y } = mapInstance.project(lngLat);
    // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds
    // mapInstance.current.fitBounds(
    //   [lngLat, lngLat],
    //   { padding: [0, 0, 400, 0] },
    // );

    // setMapCenter(activeEvent.coordinates);

    //if (mapInstance) {
    // mInstance.flyTo({
    //   center: getLngLatArray(activeMarker.latLng),
    //   speed: 0.2,
    //   curve: 1,
    // });
    // mapInstance.easeTo({
    //   center: getLngLatTuple(mapCenter),
    //   padding: {top: 0, bottom: 200, left: 0, right: 0}
    // });
    // }

    // Open Event modal
    setEventOpen(true);

  }, [
    activeEvent,
  ]);

  // https://docs.mapbox.com/mapbox-gl-js/example/offset-vanishing-point-with-padding/
  useEffect(() => {
    if (!activeEvent?.coordinates) {
      return;
    }
    if (!isEventOpen) {
      mapInstance.easeTo({
        center: activeEvent ? getLngLatTuple(activeEvent.coordinates) : undefined,
        zoom: 18,
        padding: {
          "bottom": 0,
        },
      });
    }
    else {
      mapInstance.flyTo({
        center: getLngLatTuple(activeEvent.coordinates),
        speed: 0.2,
        curve: 1,
      });
      mapInstance.easeTo({
        center: activeEvent ? getLngLatTuple(activeEvent.coordinates) : undefined,
        zoom: 19,
        padding: {
          "bottom": windowHeight - 400
        },
      });
    }
  }, [
    isEventOpen,
  ]);

  /**
   * Handlers
   */
  const handleAddressSearch = (ev: SyntheticEvent<HTMLInputElement>) => {
    const address = ev.currentTarget.value;
    setAddress(address);
  };

  const handleAddressClick = (address: string) => (ev: SyntheticEvent<HTMLDivElement>) => {
    ev.persist();
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(lngLat => {
        setActiveEvent({
          coordinates: lngLat,
          location: address,
          startPosition: (ev.target as HTMLDivElement).getBoundingClientRect(),
          startFromSearch: true,
        });
      })
      .catch(error => {
        console.error("Error", error);
      });
  };

  const handleMarker = (event: TMapEvent) => (ev: SyntheticEvent<HTMLDivElement>) => {
    setActiveEvent({
      ...event,
      startPosition: (ev.target as HTMLDivElement).getBoundingClientRect(),
      startFromSearch: false,
    });
  };

  /**
   * Render fns
   */
  const renderMarker = (event) => {
    if (!event) {
      return;
    }
    const markerCoords = getLngLatTuple(event.coordinates);

    if (!markerCoords) {
      return;
    }

    return (
      <Marker
        coordinates={markerCoords}
        anchor="bottom"
      >
        <>
          <div className={markerStyles.poi} onClick={handleMarker(event)}/>
          <div className={markerStyles.pulse}/>
        </>
      </Marker>
    );
  };

  /**
   * Return JSX
   */
  return (
    <div className={styles.container}>
      <div
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={styles.toggle}
      />

      <SearchInput
        address={address}
        handleAddressSearch={handleAddressSearch}
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
      />

      {!!predictions.length &&
      <PredictionsDropdown
        items={predictions}
        handleClick={handleAddressClick}
      />}

      <AnimatePresence>
        {(isEventOpen && !!activeEvent) &&
        <EventModal
          {...activeEvent}
          setEventOpen={setEventOpen}
          isEventOpen={isEventOpen}
        />}
      </AnimatePresence>

      <Map>
        {events$?.map((event, eventIdx) => {
            return (
              <Fragment key={`event-${eventIdx}`}>
                {renderMarker(event)}
              </Fragment>
            );
          },
        )}
        {renderMarker(activeEvent)}
      </Map>
    </div>
  );
};

export { EventsApp };
