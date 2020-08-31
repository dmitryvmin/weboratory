// Libs
import React, { useEffect, useRef, useContext, useMemo } from "react";
import { history } from "../../router";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

// styles
import styles from "./styles.module.scss";

// Utils
import { Auth0Context } from "@utils/hooks/useAuth0";
import { useObservable } from "@utils/hooks/useObservable";

// Types
import { IEvent } from "@common/types";

// Components
import { Map } from "@components/Map";
import { MapMarker } from "@components/Map/components/MapMarker/MapMarker";
import { MapSearch } from "@components/Events/Search/MapSearch";

// Utils

// Store
import { useEvents } from "@stores/EventStore";

// Constants
import { getNewEventKey } from "@components/Events/utils/getEventKey";

import { eventsInstance } from "@components/Events/eventsInstance";
import { useNodeRef } from "@utils/hooks/useNodeRef";
import { EventModal } from "@components/EventModal";
import { useEventStore } from "@stores/globalStore/stores/event/useEventStore";
import { useEventsDataStore } from "@stores/globalStore/stores/eventsData/useEventsData";
import { EventsMenu } from "@components/Controls/EventsMenu";

/**
 * Events App
 *
 * References:
 * - https://developers.google.com/maps/documentation/javascript/tutorial
 * - https://stackoverflow.com/questions/42180788/how-to-use-cors-to-implement-javascript-google-places-api-request
 */
const EventsApp: React.FC = () => {

  /**
   * ========== hooks
   */

  const { queryEventsData } = useEventsDataStore();

  const { node: menuNode1, ref: menuRef1 } = useNodeRef<HTMLDivElement>();
  const { node: menuNode2, ref: menuRef2 } = useNodeRef<HTMLDivElement>();


  const { user } = useContext(Auth0Context);

  /**
   * ========== Component hooks
   */
    // const eventsInstance = useMemo(() => new eventsService(), []);

  const events$ = useObservable<IEvent[]>(eventsInstance.onEvents());
  const event$ = useObservable<IEvent>(eventsInstance.onEvent());

  /**
   * Effects
   */
  // On mount:
  useEffect(() => {
    // Start map loaded on client's address
    // centerMapOnClient();

    // Query eventsData
    queryEventsData();
  }, []);

  // Get events for logged in user or public
  useEffect(() => {
    if (!user?.sub) {
      eventsInstance.getEventsByVis("PUBLIC");
    }
    else {
      eventsInstance.getUserEvents(user.sub);
    }
  }, [
    user,
    event$,
  ]);

  /**
   * ========== Container Business Login
   */

  // Handle Active Event change
  // useEffect(() => {
  //
  //   // If Active Event is not set, return
  //   if (!activeEvent) {
  //     return;
  //   }
  //
  //   // When an Active Event is set, set Map center on it
  //
  // }, [
  //   activeEvent,
  // ]);

  /**
   * Render fns
   */


  // const renderNewEventMarker = () => {
  //   if (
  //     !activeEvent?.address ||
  //     !activeEvent?.coordinates ||
  //     !(activeEvent.eventId && activeEvent.eventId.startsWith("new"))
  //   ) {
  //     return;
  //   }
  //   return (
  //     <MapMarker
  //       key={getNewEventKey(activeEvent.address)}
  //       event={activeEvent}
  //     />
  //   );
  // };

  /**
   * Return JSX
   */
  return (
    <div className={styles.container}>

      <EventsMenu menuRefs={{ menuRef1, menuRef2 }}/>

      <EventModal menuNode={menuNode1}/>

      <MapSearch menuNode={menuNode2}/>

      <Map />
    </div>
  );
};

export { EventsApp };
