// Libs
import React, { useEffect, SyntheticEvent, useState, useRef, Fragment, useContext } from "react";
import { Marker } from "react-mapbox-gl";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { AnimatePresence } from "framer-motion";

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
import { useMap } from "@components/Events/Map/Map";
import { SearchInput } from "@components/Events/MapSearch/SearchInput";
import { PredictionsDropdown } from "@components/Events/PredictionsDropdown/PredictionsDropdown";
import { EventModal } from "@components/Events/EventModal";
import { Map } from "@components/Events/Map";

// Event utils
import { useAddressPredictions } from "@components/Events/utils/useAddressPredictions";
import { getCurrentPosition } from "@components/Events/utils/getCurrentPosition";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { getLngLatArray } from "@components/Events/utils/getLngLatArray";

declare var google;

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

  const [coords, setCoords] = useState<TLngLat>();

  const [activeEvent, setActiveEvent] = useState<TMapEvent | undefined>();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(true);

  const [isEventOpen, setEventOpen] = useState<boolean>(false);

  /**
   * Hooks
   */
  const predictions = useAddressPredictions(address);

  const { mapInstance } = useMap();

  const eventsInstance = useRef(new eventsService());

  const events$ = useObservable<IEvent[]>(eventsInstance.current.onEvents());

  // User business logic - TODO: move out
  const { user } = useContext(Auth0Context);

  /**
   * Effects
   */
  // Start map loaded on client's location
  useEffect(() => {
    getCurrentPosition().then((position) => {
      if (!position) {
        return;
      }
      // const lngLat = getLngLatArray(position);
      // if (!lngLat) {
      //   return;
      // }
      setCoords(position);
    });
  }, []);

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
    eventsInstance.current.getEvents(user.sub);
  }, [
    user,
  ]);

  // Center the map to the input address
  useEffect(() => {
    if (address?.length < 10) {
      return;
    }
    geocodeQuery(address).then((newCoords) => {
      if (newCoords.lat === coords?.lat && newCoords.lng === coords?.lng) {
        return;
      }
      // setCoords(newCoords);
      // const mInstance = getMapInstance();
      const mInstance = mapInstance;
      if (mInstance) {
        mInstance.flyTo({
          center: getLngLatArray(newCoords),
          speed: 1,
          curve: 1,
        });
      }
    });
  }, [address]);

  // when activeMarker is set
  useEffect(() => {
    // const mInstance = getMapInstance();

    if (!activeEvent) {
      return;
    }
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

    setCoords(activeEvent.lngLat);

//     mapInstance.flyTo({
//       // These options control the ending camera position: centered at
// // the target, at zoom level 9, and north up.
//       center: activeMarker.latLng,
//       zoom: 9,
//       bearing: 0,
//
// // These options control the flight curve, making it move
// // slowly and zoom out almost completely before starting
// // to pan.
//       speed: 0.2, // make the flying slow
//       curve: 1, // change the speed at which it zooms out
//
// // This can be any easing function: it takes a number between
// // 0 and 1 and returns another number between 0 and 1.
//       easing: function(t) {
//         return t;
//       },
//
// // this animation is considered essential with respect to prefers-reduced-motion
//       essential: true,
//     });

    // if (mInstance) {
    //   // mInstance.flyTo({
    //   //   center: getLngLatArray(activeMarker.latLng),
    //   //   speed: 0.2,
    //   //   curve: 1,
    //   // });
    //   mInstance.easeTo({
    //     center: getLngLatArray(activeMarker.latLng),
    //     padding: {top: 0, bottom: 200, left: 0, right: 0}
    //   });
    // }

    // Open Event modal
    setEventOpen(true);

  }, [activeEvent]);

  // https://docs.mapbox.com/mapbox-gl-js/example/offset-vanishing-point-with-padding/
  useEffect(() => {
    // const mInstance = getMapInstance();
    const mInstance = mapInstance;
    if (!mInstance) {
      return;
    }
    if (!isEventOpen) {
      mInstance.easeTo({
        center: activeEvent ? getLngLatArray(activeEvent.lngLat) : undefined,
        zoom: 18,
        padding: { "bottom": 0 },
      });
    }
    else {
      mInstance.easeTo({
        center: activeEvent ? getLngLatArray(activeEvent.lngLat) : undefined,
        zoom: 19,
        padding: { "bottom": 300 },
      });
    }
  }, [isEventOpen]);

  /**
   * Handlers
   */
  const handleSearch = (ev: SyntheticEvent<HTMLInputElement>) => {
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
    const markerCoords = getLngLatArray(event.coordinates);

    if (!markerCoords) {
      return null;
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
        handleSearch={handleSearch}
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
      />

      <PredictionsDropdown
        items={predictions}
        handleClick={handleAddressClick}
      />

      <Map center={coords}>
        <>
          <AnimatePresence>
            {(isEventOpen && activeEvent) &&
            <EventModal
              {...activeEvent}
              setEventOpen={setEventOpen}
              isEventOpen={isEventOpen}
              mapInstance={mapInstance}
            />}
          </AnimatePresence>
          {events$ && events$?.map((event, eventIdx) => {
              return (
                <Fragment key={`event-${eventIdx}`}>
                  {renderMarker(event)}
                </Fragment>
              );
            },
          )}
          {activeEvent && renderMarker(activeEvent)}
        </>
      </Map>
    </div>
  );
};

export { EventsApp };
