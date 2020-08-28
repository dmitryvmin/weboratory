// Libs
import { useContext, MouseEvent } from "react";
import { log } from "@dmitrymin/fe-log";
import invariant from "invariant";

// Store
import { ActiveEvent, IEventsContext, IEventsState, IUseEvents } from "./types";
import { EventsContext } from "./EventsContext";
import { history } from "../../router";

/**
 * Events context facade
 */
const useEvents = (): IUseEvents => {

  /**
   * =============== Hooks ===============
   */
  const [
    state,
    setState,
  ] = useContext<IEventsContext>(EventsContext);

  const {
    activeEvent,
    isSearchOpen,
    isEventOpen,
    isMenuOpen,
    searchedAddress,
  } = state;

  /**
   * ==================== State setters ====================
   */

  /**
   *
   */
  const setActiveEvent = (event: ActiveEvent) => {
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

  const updateActiveEvent = (eventData: ActiveEvent) => {
    setState((s): IEventsState => ({
      ...s,
      activeEvent: {
        ...s.activeEvent,
        ...eventData,
      },
    }));
  };

  const setIsMenuOpenTo = (isMenuOpen: boolean) => {
    setState((s): IEventsState => ({
      ...s,
      isMenuOpen,
    }));
  };

  const setSearchedAddressTo = (searchedAddress: string) => {
    setState((s): IEventsState => ({
      ...s,
      searchedAddress,
    }));
  };

  /**
   * ==================== Utility functions ====================
   */



  /**
   * ==================== Public functions ====================
   */

  // When the Event Modal is opened
  function openEvent(event: any) {

    const eventToOpen = event ?? activeEvent;

    log("Opening Event Modal...", eventToOpen);

    if (!eventToOpen) {
      return;
    }

    setIsEventOpen(true);

    // Update browser history
    history.push(`/events?eventId=${eventToOpen.eventId}`);

    // Center marker above the event
    // if (eventToOpen.coordinates) {
    //   easeTo({
    //     coords: eventToOpen.coordinates,
    //     padding: { bottom: 400 },
    //     zoom: 17,
    //   });
    // }
  }

  /**
   * Sets the passed event as the activeEvent
   */
  async function setEvent(event, isOpen) {

    // const newActiveEvent = await createEventObject(event);

    // setActiveEvent(newActiveEvent);
    //
    // // easeTo({
    // //   coords: newActiveEvent.coordinates,
    // // });
    //
    // if (isOpen) {
    //   openEvent(newActiveEvent);
    // }
  }

  // When the Event Modal is closed
  function closeEvent() {

    log("Closing Event Modal...");

    setIsEventOpen(false);

    // Update browser history
    history.push("/events");

    // If Event address has been set...
    // if (activeEvent?.coordinates) {
    //
    //   easeTo({
    //     coords: activeEvent.coordinates,
    //     padding: { top: 0, bottom: 0 },
    //     zoom: 15,
    //   });
    // }
  }

  function openSearch() {
    log("Opening Search...");
  }

  function closeSearch() {
    log("Closing Search...");

    // Hide search predictions
    updateActiveEvent({ address: "" });
    setSearchedAddressTo("");

    // Close Search Input
    setIsSearchOpen(false);
  }

  async function startNewEvent() {
    log("Starting new Event...");

    // const newEvent = await createEventObject({
    //   ...InitialEvent,
    //   title: "New Event",
    // });

    // setActiveEvent(newEvent);

    setIsEventOpen(true);
  }

  // log({ labelAs: "Events state" }, state);

  /**
   * Return memoized events state and public utilities
   */
  return ({
    activeEvent,
    isSearchOpen,
    isEventOpen,
    isMenuOpen,
    searchedAddress,
    setIsSearchOpen,
    setIsEventOpen,
    setEvent,
    closeEvent,
    openEvent,
    openSearch,
    closeSearch,
    startNewEvent,
    updateActiveEvent,
    setIsMenuOpenTo,
    setSearchedAddressTo,
  });
};

export { useEvents };
