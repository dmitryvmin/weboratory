/**
 * Return geo data for a placeId
 */
const geocodeByPlaceId = (placeId: string) => {
  const geocoder = new google.maps.Geocoder();
  const OK = google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export {geocodeByPlaceId}