import { TCoords } from "@components/Events/types";

/**
 * Formats latLng object into [lat, lng] tuple
 */
const getLngLatArray = (latLng: any): TCoords | undefined => {

  if (!latLng) {
    console.warn("Couldn't format latLng because the value is falsy.");
    return;
  }

  return [latLng.lng, latLng.lat];
};

export { getLngLatArray };
