import { eventsDataState } from "@stores/globalStore/reducers/eventsDataState";

function rootReducer(currentState, action) {
  return {
    loading: eventsDataState(
      currentState
        ? currentState.loading
        : false,
      action,
    ),
  };
}

export { rootReducer };
