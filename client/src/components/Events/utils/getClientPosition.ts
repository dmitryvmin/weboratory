// Types
import { TLngLat } from "@common/types";
type CurrentPosition = any;

export function getCurrentPosition(options = {}): Promise<CurrentPosition> {
  // const options: PositionOptions =  {
  //   enableHighAccuracy: true,
  //   timeout: 10000,
  //   maximumAge: 1000
  // };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

/**
 * Gets client geolocation
 */
async function getClientPosition() {
  try {
    const { coords } = await getCurrentPosition();
    const { latitude, longitude } = coords;
    return ({
      lng: longitude,
      lat: latitude,
    });
  }
  catch (error) {
    console.log("Unable to retrieve client location", error);
  }
};

export { getClientPosition };