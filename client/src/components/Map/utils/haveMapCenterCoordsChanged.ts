// Types
import { TCoords, TLngLat } from "@common/types";
import { log } from "@utils/Logger";

/**
 * Compares coordinate props to determine whether Map should rerender
 */
function haveMapCenterCoordsChanged(
  nextCoords: TLngLat,
  prevCoords?: TLngLat,
): boolean {

  let haveChanged = false;

  // If previous coordinates are undefined, coordinates have changed
  if (prevCoords === undefined) {
    haveChanged = true;
  }
  else {
    // If prev and next lat/lng values are the same, coordinates haven't changed
    if (
      prevCoords.lng !== nextCoords.lng ||
      prevCoords.lat !== nextCoords.lat
    ) {
      haveChanged = true;
    }
  }
  // log("@@haveCoordsChanged", haveChanged, nextCoords, prevCoords);

  return haveChanged;
}

export { haveMapCenterCoordsChanged };
