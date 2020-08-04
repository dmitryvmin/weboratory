// type Geocoder = google.maps.Geocoder;
type Geocoder = any;

/**
 * Return geo data for a placeId
 */
const geocodeByPlaceId = (placeId: string) => {
  const geocoder: Geocoder = new (window as any).google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== (window as any).google.maps.GeocoderStatus.OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export {geocodeByPlaceId}