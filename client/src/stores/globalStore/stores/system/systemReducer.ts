import { SYSTEM_ERROR } from "@stores/globalStore/stores/system/systemConstants";
import { systemInitialState } from "@stores/globalStore/stores/system/systemInitialState";

function systemReducer(state = systemInitialState, action) {
  switch (action.type) {
    case SYSTEM_ERROR:
      return ({
        ...state,
        systemError: action.systemError,
      });

    default:
      return state;
  }
}

export { systemReducer };
