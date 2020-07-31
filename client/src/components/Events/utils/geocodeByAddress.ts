type GeocoderResult = google.maps.GeocoderResult;
type GeocoderStatus = google.maps.GeocoderStatus;

/**
 * Return geo data for an address
 */
const geocodeByAddress = (address: string): Promise<GeocoderResult[]> => {
  const geocoder = new google.maps.Geocoder();
  const OK = google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (results: GeocoderResult[], status: GeocoderStatus) => {
        if (status !== OK) {
          console.log(`Couldn't geocode address "${address}"`, status);
          reject(status);
        }
        resolve(results);
      });
  });
};

export { geocodeByAddress };
