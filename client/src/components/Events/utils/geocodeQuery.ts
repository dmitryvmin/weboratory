// Libs
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Types
import { TLngLat } from "@components/Events/types";

/**
 * Geocodes an address string
 */
function geocodeQuery(address) {
  return new Promise((resolve: (c: TLngLat) => void, reject) => {
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(({ lng, lat }) => {
        return resolve({ lng, lat });
      })
      .catch(error => {
        console.error("geocodeQuery Error", error);
        reject(error);
      });
  });
};

export { geocodeQuery };