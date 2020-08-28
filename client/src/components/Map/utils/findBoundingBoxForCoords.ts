import { TLngLat } from "@common/types";
import L, { LatLng } from "leaflet";
import * as turf from "@turf/turf";

// Returns LngLatBounds
function findEnclosingBoundingBox(coordinates: TLngLat[]) {
  let west, east, north, south;

  const latLngArray: number[][] = [];

  for (let i = 0; i < coordinates.length; i++) {
    const loc = coordinates[i];

    // if (i === 0) {
    //   north = loc.lat;
    //   south = loc.lat;
    //   west = loc.lng;
    //   east = loc.lng;
    // }

    // north = Math.max(loc.lat, north);
    // south = Math.min(loc.lat, south);
    // west = Math.min(loc.lng, west);
    // east = Math.min(loc.lng, east);
    latLngArray.push([loc.lat, loc.lng])
  }

  const polygon = L.polygon(coordinates);
  const bounds = polygon.getBounds();
  const {lat: a, lng: b} = bounds.getSouthWest();
  const {lat: c, lng: d} = bounds.getNorthEast();

  const _bounds = [[b, a], [d, c]];

  return _bounds;
}

export { findEnclosingBoundingBox };
