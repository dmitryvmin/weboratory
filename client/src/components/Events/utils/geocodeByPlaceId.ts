type Geocoder = google.maps.Geocoder;

declare const google: any;

/**
 * Return geo data for a placeId
 */
const geocodeByPlaceId = (placeId: string) => {
  // @ts-ignore
  const geocoder: Geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export {geocodeByPlaceId}