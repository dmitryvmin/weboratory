// App
import { MAIN_MENU_MODE } from "@stores/globalStore/stores/controls/controlsConstants";
import { controlsInitState } from "@stores/globalStore/stores/controls/controlsDefaults";

function controlsReducer(state = controlsInitState, action) {

  switch (action.type) {

    case MAIN_MENU_MODE:
      return ({
        ...state,
        mainMenuMode: action.mainMenuMode,
      });

    default:
      return state;
  }
}

export { controlsReducer };