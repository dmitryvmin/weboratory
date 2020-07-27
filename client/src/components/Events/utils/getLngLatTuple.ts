import { TCoords, TLngLat } from "@components/Events/types";

/**
 * Formats latLng object into a [lat, lng] tuple
 */
function getLngLatTuple(latLng: TLngLat): TCoords | undefined {

  if (!latLng) {
    console.warn("Couldn't format latLng because the value is falsy.");
    return;
  }

  return [latLng.lng, latLng.lat];
};

export { getLngLatTuple };
