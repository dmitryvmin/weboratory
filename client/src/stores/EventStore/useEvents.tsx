// Libs
import { useContext, MouseEvent } from "react";
import invariant from "invariant";

// Store
import { ActiveEvent, IEventsContext, IEventsState, IUseEvents } from "./types";
import { EventsContext } from "./EventsContext";
import { log } from "@utils/Logger";
import { history } from "../../router";
import { TEventModal } from "@components/Events/EventModal/types";
import { useMap } from "@stores/MapStore";
import { getNewEventKey } from "@components/Events/utils/getEventKey";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";

/**
 * Events context facade
 */
const useEvents = (): IUseEvents => {

  /**
   * =============== Hooks ===============
   */
  const [
    {
      activeEvent,
      isSearchOpen,
      isEventOpen,
      searchedAddress,
    },
    setState,
  ] = useContext<IEventsContext>(EventsContext);

  const { easeTo, flyTo } = useMap();

  /**
   * ==================== State setters ====================
   */

  /**
   *
   */
  const setActiveEvent = (event: ActiveEvent) => {
    log("@@ setActiveEvent", event);
    setState((s): IEventsState => ({
      ...s,
      activeEvent: event,
    }));
  };

  const setIsSearchOpen = (isOpen: boolean) => {
    setState((s): IEventsState => ({
      ...s,
      isSearchOpen: isOpen,
    }));
  };

  const setIsEventOpen = (isOpen: boolean) => {
    setState((s): IEventsState => ({
      ...s,
      isEventOpen: isOpen,
    }));
  };

  const setSearchedAddress = (searchedAddress: string) => {
    setState((s): IEventsState => ({
      ...s,
      searchedAddress,
    }));
  };

  /**
   * ==================== Utility functions ====================
   */


  /**
   * Creates an Event object
   */
  async function createEventObject({
    markerNode,
    // animateFromNode,
    ...rest
  }: ActiveEvent) {

    // If no coordinates have been passed,
    // query coordinates by address
    let coordinates;
    if (!rest.coordinates) {
      coordinates = await geocodeQuery(rest.address);
    }
    else {
      coordinates = rest.coordinates;
    }

    // Create event object
    const eventObject: ActiveEvent = {
      markerNode: markerNode ?? null,
      // animateFromNode: animateFromNode ?? null,
      event_id: rest.event_id ?? getNewEventKey(rest.address),
      coordinates,
      created_at: rest.created_at,
      updated_at: rest.updated_at,
      address: rest.address,
      time: rest.time,
      title: rest.title,
      content: rest.content,
    };

    return eventObject;
  }

  /**
   * Creates and set an Event
   */
  // const setEvent = async ({
  //
  // }
  //   markerNode,
  //   searchNode,
  //   address,
  //   coordsArg,
  // ) => {
  //
  //   // Get marker element position
  //   // const startPosition = getPositionFromTarget(ev.target as HTMLDivElement);
  //
  //   // If no coordinates have been passed,
  //   // query coordinates by address
  //   let coordinates;
  //   if (!coordsArg) {
  //     coordinates = await geocodeQuery(address);
  //   }
  //   else {
  //     coordinates = coordsArg;
  //   }
  //
  //   // Create event object
  //   const event = createEventObject({
  //     markerNode,
  //     searchNode,
  //     address,
  //     coordinates,
  //   });
  //
  //   setActiveEvent(event);
  // };


  /**
   * ==================== Public functions ====================
   */

  const setEvent = async (event, isOpen) => {

    const newActiveEvent = await createEventObject(event);

    setActiveEvent(newActiveEvent);

    easeTo({
      coords: newActiveEvent.coordinates,
    });

    if (isOpen) {
      openEvent(newActiveEvent);
    }
  };

  // When the Event Modal is closed
  const closeEvent = () => {

    log("Closing Event Modal...");

    setIsEventOpen(false);

    // Update browser history
    history.push("/events");

    // // If Event address has been set...
    if (activeEvent?.coordinates) {

      easeTo({
        coords: activeEvent.coordinates,
        padding: { top: 0, bottom: 0 },
        zoom: 15,
      });
    }
  };

  // When the Event Modal is opened
  const openEvent = (event) => {

    const eventToOpen = event ?? activeEvent;

    log("Opening Event Modal...", eventToOpen);

    if (!eventToOpen) {
      return;
    }

    setIsEventOpen(true);

    // Update browser history
    history.push(`/events?eventId=${eventToOpen.event_id}`);

    // Center marker above the event
    if (eventToOpen.coordinates) {
      easeTo({
        coords: eventToOpen.coordinates,
        padding: { bottom: 400 },
        zoom: 17,
      });
    }
  };

  const openSearch = () => {
  };

  const closeSearch = () => {

    // Hide search predictions
    setSearchedAddress("");

    // Close Search Input
    setIsSearchOpen(false);

  };

  /**
   * Return memoized events state and public utilities
   */
  return ({
    activeEvent,
    isSearchOpen,
    isEventOpen,
    searchedAddress,
    setIsSearchOpen,
    setIsEventOpen,
    setSearchedAddress,
    setEvent,
    closeEvent,
    openEvent,
    openSearch,
    closeSearch,
  });
};

export { useEvents };
