// Libs
import { useContext } from "react";
import invariant from "invariant";
import { PaddingOptions } from "react-mapbox-gl/lib/map";

// Map store
import { IMapContext, IMapState, IUseMap, TEventMarker } from "./types";
import { MapContext } from "./MapContext";

// Common types
import { TLngLat } from "@common/types";

// Event utils
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { getClientPosition } from "@components/Events/utils/getClientPosition";
import { geocodeQuery } from "@components/Events/utils/geocodeQuery";
import { getNewMarkerId } from "@components/Events/utils/getNewMarkerId";

/**
 * Map context facade
 */
const useMap = (): IUseMap => {

  /**
   * ==================== Hooks ====================
   */
  const [
    {
      mapCenterCoords,
      mapInstance,
      mapZoom,
      mapRef,
      activeMarker,
    },
    setState,
  ] = useContext<IMapContext>(MapContext);

  /**
   * ==================== State Setters ====================
   */
  function setMapCenterCoords(coords: TLngLat) {
    setState((s): IMapState => {
        return ({
          ...s,
          mapCenterCoords: coords,
        });
      },
    );
  }

  function setMapInstance(instance) {
    setState((s: IMapState) => ({
      ...s,
      mapInstance: instance,
    }));
  }

  function setMapRef(ref) {
    setState((s): IMapState => ({
      ...s,
      mapRef: ref,
    }));
  }

  function setMapZoom(zoom) {
    setState((s): IMapState => ({
      ...s,
      mapZoom,
    }));
  }

  function setActiveMarker(marker: TEventMarker) {
    setState((s): IMapState => ({
      ...s,
      activeMarker: marker,
    }));
  }

  /**
   * ==================== Public functions ====================
   */

  function easeTo({
    coords,
    padding,
    zoom,
  }) {
    mapInstance.easeTo({
      ...coords && { center: getLngLatTuple(coords) },
      ...zoom && { zoom },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding,
      },
    });
  }

  const centerMapOnClient = async () => {
    const coords = await getClientPosition();
    if (!coords) {
      invariant(coords, `Couldn't set mapCenter - client coordinates are falsy: ${coords}`);
      return;
    }

    setMapCenterCoords(coords);
  };

  const centerMapOnAddress = async (address: string) => {

    const lngLat = await geocodeQuery(address);
    if (!lngLat) {
      return;
    }

    setMapCenterCoords(lngLat);
    // mapInstance.flyTo({
    //   center: getLngLatTuple(lngLat),
    //   speed: 1,
    //   curve: 1,
    // });
  };

  // Creates new Marker Object
  const createMarker = async ({
    address,
    coordinates: coordsArg,
    ...rest
  }) => {

    // To appear on the map, a marker needs coordinates.
    // If no coordinates have been passed, query coordinates by address
    let coordinates;
    if (!coordsArg) {
      coordinates = await geocodeQuery(address);
    }
    else {
      coordinates = coordsArg;
    }

    invariant(coordinates, `Could not get lngLat coordinates for ${address}`);

    // Assemble the marker object
    const marker: TEventMarker = {
      event_id: getNewMarkerId(address),
      coordinates,
      address,
      ...rest,
    };

    return marker;
  };

  const centerMapOnCoords = (coords: TLngLat) => {
    setMapCenterCoords(coords);
  };

  // Sets Active Marker and centers map on it
  const setMarker = async (markerArgs) => {

    const marker = await createMarker(markerArgs);

    // Set current marker as ActiveMarker
    setActiveMarker(marker);

    // Center map
    setMapCenterCoords(marker.coordinates);
  };

  /**
   * Return map state and public utilities
   */
  return ({
    activeMarker,
    mapCenterCoords,
    mapInstance,
    mapZoom,
    mapRef,
    setMapInstance,
    setMapRef,
    setMapCenterCoords,
    setMapZoom,

    centerMapOnClient,
    centerMapOnAddress,
    centerMapOnCoords,

    setMarker,
    easeTo,
  });
};

export { useMap };
