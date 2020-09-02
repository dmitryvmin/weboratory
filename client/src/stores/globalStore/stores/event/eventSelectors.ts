export const getEventModalMode = state => state.eventReducer.eventModalMode;

export const getIsEventModalOpen = state => state.eventReducer.eventModalMode === "OPEN";

export const getEventModal = state => state.eventReducer.eventModal;

export const getEvent = state => state.eventReducer.event;
