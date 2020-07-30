import { TLngLat } from "@common/types";

type GeocoderResult = any;

/**
 * Return latLng from geocode data
 */
const getLngLat = (result: GeocoderResult): Promise<TLngLat> => {
  return new Promise((resolve, reject) => {
    try {
      const lngLat: TLngLat = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
      resolve(lngLat);
    }
    catch (err) {
      console.log("Couldn't retrieve lngLat for geocode data:", result, err);
      reject(err);
    }
  });
};

export { getLngLat };
