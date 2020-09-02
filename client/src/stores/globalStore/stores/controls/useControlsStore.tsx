// Libs
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { setMainMenuMode } from "@stores/globalStore/stores/controls/controlsActions";

// Selectors
import {
  getIsMainMenuOpen,
  getMainMenuMode,
} from "@stores/globalStore/stores/controls/controlsSelectors";

/**
 * Map store facade
 */
export function useControlsStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const mainMenuMode = useSelector(getMainMenuMode);
  const isMainMenuOpen = useSelector(getIsMainMenuOpen);

  /**
   * Dispatchers
   */
  const _setMainMenuMode = useCallback(
    (mainMenuMode) => dispatch(setMainMenuMode(mainMenuMode)),
    [dispatch],
  );

  const openMainMenu = useCallback(
    () => dispatch(setMainMenuMode("OPEN")),
    [dispatch],
  );

  const closeMainMenu = useCallback(
    () => dispatch(setMainMenuMode("CLOSED")),
    [dispatch],
  );

  const toggleMainMenu = useCallback(
    () => dispatch(setMainMenuMode(isMainMenuOpen ? "CLOSED" : "OPEN")),
    [
      dispatch,
      isMainMenuOpen,
    ],
  );

  return ({
    mainMenuMode,
    openMainMenu,
    closeMainMenu,
    isMainMenuOpen,
    toggleMainMenu,
  });
}