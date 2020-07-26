// Libs
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// App
import { TLngLat } from "../types";

const geocodeQuery = (address) => {
  return new Promise((resolve: (c: TLngLat) => void, reject) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lng, lat }) => resolve({ lng, lat }))
      .catch(error => {
        console.error("geocodeQuery Error", error);
        reject(error);
      });
  });
};

export {geocodeQuery};