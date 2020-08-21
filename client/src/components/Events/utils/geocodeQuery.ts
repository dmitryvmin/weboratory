// Libs
import invariant from "invariant";
import { log } from "@dmitrymin/fe-log";

// Types
import { TLngLat } from "@common/types";
import { getLngLat } from "@components/Events/utils/getLngLat";
import { geocodeByAddress } from "@components/Events/utils/geocodeByAddress";

/**
 * Geocodes an address string
 */
async function geocodeQuery(address) {
  try {
    const response = await geocodeByAddress(address);
    if (!response.length) {
      return;
    }
    const coords: TLngLat = await getLngLat(response[0]);
    if (!coords) {
      return;
    }
    return coords;
  }
  catch(err) {
    log(`geocodeQuery error for address ${address}:`, err);
    return;
  }
}

export { geocodeQuery };