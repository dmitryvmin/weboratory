import { MAIN_MENU_STATE } from "@stores/globalStore/stores/controls/controlsConstants";
import { MainMenuStateType } from "@stores/globalStore/stores/controls/types";

function setMainMenuState(mainMenuState: MainMenuStateType) {
  return {
    type: MAIN_MENU_STATE,
    mainMenuState,
  };
}

export {
  setMainMenuState,
};
