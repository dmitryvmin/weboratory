import { TLngLat } from "@common/types";
import L, { LatLng } from "leaflet";
import * as turf from "@turf/turf";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import mapboxgl, { LngLatBounds } from "mapbox-gl";

// Returns LngLatBounds
function findEventsBoundingBox(coordinates: TLngLat[]): LngLatBounds {
  // let west, east, north, south;
  // for (let i = 0; i < coordinates.length; i++) {
  //   const loc = coordinates[i];
  //
  //   if (i === 0) {
  //     north = loc.lat;
  //     south = loc.lat;
  //     west = loc.lng;
  //     east = loc.lng;
  //   }
  //
  //   north = Math.max(loc.lat, north);
  //   south = Math.min(loc.lat, south);
  //   west = Math.min(loc.lng, west);
  //   east = Math.max(loc.lng, east);
  // }
  // const northeast = new LatLng(north, east);
  // const  southwest = new LatLng(south, east);
  // const bounds: MapBounds = [west, south, east, north];
  // const bounds: MapBounds = [[south, west], [north, east]]];

  const lngLat = coordinates.map(c => getLngLatTuple(c));

  const bounds = lngLat.reduce(function(bounds, coord) {
    return bounds.extend(coord)
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  return bounds;
}

export { findEventsBoundingBox };
