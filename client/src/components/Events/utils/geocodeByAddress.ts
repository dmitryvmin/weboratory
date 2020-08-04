// type GeocoderResult = google.maps.GeocoderResult;
// type GeocoderStatus = google.maps.GeocoderStatus;
// type Geocoder = google.maps.Geocoder;
type GeocoderResult = any;
type GeocoderStatus = any;
type Geocoder = any;

/**
 * Return geo data for an address
 */
const geocodeByAddress = (address: string): Promise<GeocoderResult[]> => {
  const geocoder: Geocoder = new (window as any).google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: GeocoderResult[], status: GeocoderStatus) => {
        if (status !== window.google.maps.GeocoderStatus.OK) {
          console.log(`Couldn't geocode address "${address}"`, status);
          reject(status);
        }
        resolve(results);
      });
  });
};

export { geocodeByAddress };
