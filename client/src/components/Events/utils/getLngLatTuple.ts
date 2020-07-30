// Common types
import { TCoords, TLngLat } from "@common/types";

/**
 * Formats latLng object into a [lat, lng] tuple
 */
function getLngLatTuple(latLng: TLngLat): TCoords {
  return [
    latLng.lng,
    latLng.lat,
  ];
};

export { getLngLatTuple };
