type GeocoderResult = google.maps.GeocoderResult;
type GeocoderStatus = google.maps.GeocoderStatus;
type Geocoder = google.maps.Geocoder;

declare var google;

/**
 * Return geo data for an address
 */
const geocodeByAddress = (address: string): Promise<GeocoderResult[]> => {
  // @ts-ignore
  const geocoder: Geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: GeocoderResult[], status: GeocoderStatus) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          console.log(`Couldn't geocode address "${address}"`, status);
          reject(status);
        }
        resolve(results);
      });
  });
};

export { geocodeByAddress };
