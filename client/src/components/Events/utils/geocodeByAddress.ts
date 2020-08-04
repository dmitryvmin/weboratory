///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>

type GeocoderResult = google.maps.GeocoderResult;
type GeocoderStatus = google.maps.GeocoderStatus;
type Geocoder = google.maps.Geocoder;

declare var google: any;

/**
 * Return geo data for an address
 */
const geocodeByAddress = (address: string): Promise<GeocoderResult[]> => {
  const geocoder: Geocoder = new (google as any).maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: GeocoderResult[], status: GeocoderStatus) => {
        if (status !== (google as any).maps.GeocoderStatus.OK) {
          console.log(`Couldn't geocode address "${address}"`, status);
          reject(status);
        }
        resolve(results);
      });
  });
};

export { geocodeByAddress };
