import { TLngLat } from "../types";

const getCurrentPosition = async () => {
  return new Promise((resolve: (c: TLngLat) => void, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Client geo position:", position);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({ lng, lat });
      },
      error => {
        console.log("Unable to retrieve your location");
        reject(error);
      },
      // {
      //   enableHighAccuracy: true,
      //   timeout: 10000,
      //   maximumAge: 1000
      // }
    );
  });
};

export {getCurrentPosition};