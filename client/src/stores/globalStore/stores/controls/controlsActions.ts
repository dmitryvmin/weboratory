import { MAIN_MENU_MODE } from "@stores/globalStore/stores/controls/controlsConstants";
import { MainMenuModeType } from "@stores/globalStore/stores/controls/types";

export function setMainMenuMode(mainMenuMode: MainMenuModeType) {
  return {
    type: MAIN_MENU_MODE,
    mainMenuMode,
  };
}
