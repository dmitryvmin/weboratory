// Types
import { TCoords, TLngLat } from "../types";

/**
 * Formats latLng object into a [lat, lng] tuple
 */
function haveCoordsChanged(
  nextCoords: TLngLat | TCoords,
  prevCoords?: TLngLat | TCoords,
): boolean {

  // If previous coordinates are undefined, coordinates have changed
  if (!prevCoords) {
    return true;
  }

  let prevLng = Array.isArray(prevCoords) ? prevCoords[0] : prevCoords.lng;
  let prevLat = Array.isArray(prevCoords) ? prevCoords[1] : prevCoords.lat;
  let nextLng = Array.isArray(nextCoords) ? nextCoords[0] : nextCoords.lng;
  let nextLat = Array.isArray(nextCoords) ? nextCoords[1] : nextCoords.lat;

  // If prev and next lat/lng values are the same, coordinates haven't changed
  if (
    prevLng === nextLng &&
    prevLat === nextLat
  ) {
    return false;
  }

  return true;
}

export { haveCoordsChanged };
