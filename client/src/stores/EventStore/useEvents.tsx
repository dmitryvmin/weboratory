// Libs
import { useContext, MouseEvent } from "react";
import invariant from "invariant";

// Store
import { IEventsContext, IEventsState, IUseEvents } from "./types";
import { EventsContext } from "./EventsContext";
import { log } from "@utils/Logger";
import { history } from "../../router";
import { TEventModal } from "@components/Events/EventModal/types";
import { useMap } from "@stores/MapStore";

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

  const {easeTo} = useMap();

  /**
   * ==================== State setters ====================
   */

  /**
   *
   */
  const setActiveEvent = (event: TEventModal) => {
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
  function createEventObject({
    markerNode,
    animateFromNode, ...rest
  }: TEventModal) {

    // Create event object
    const eventObject: TEventModal = {
      markerNode: markerNode ?? null,
      animateFromNode: animateFromNode ?? null,
      event_id: rest.event_id,
      created_at: rest.created_at,
      address: rest.address,
      coordinates: rest.coordinates,
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

  const setEvent = (props) => {

    const event = createEventObject(props);

    setActiveEvent(event);
  };

  // When the Event Modal is closed
  const closeEvent = () => {

    log("Closing Event Modal...");

    setIsEventOpen(false);

    // Update browser history
    history.push("/events");

    // // If Event address has been set...
    // if (activeEvent.coordinates) {
    //   // Center map on event, remove padding
    //   setMapCenterCoordsPadded(activeEvent.coordinates);
    // }
  };

  // When the Event Modal is opened
  const openEvent = () => {
    log("Opening Event Modal...", activeEvent);

    if (!activeEvent) {
      return;
    }

    setIsEventOpen(true);

    // Update browser history
    history.push(`/events?eventId=${activeEvent!.event_id}`);

    // If Event address has been set...
    // if (activeEvent.coordinates) {
    //   // Center map on event in the top of the screen
    //   flyTo(activeEvent.coordinates, { bottom: 400 }, 17);
    // }
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
