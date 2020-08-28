import { MapMoveOptionsType } from "@stores/globalStore/stores/map/types";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";

/**
 * Map Utility Class
 */
class MapUtils {

  // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#easeto
  public static easeMapTo({
    mapInstance,
    coords,
    padding,
    zoom,
  }: MapMoveOptionsType) {

    const center = coords && getLngLatTuple(coords);

    mapInstance.easeTo({
      ...coords && { center },
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

  public static mapFlyTo({
    mapInstance,
    coords,
    padding,
    zoom,
    speed,
  }: MapMoveOptionsType) {

    const center = coords && getLngLatTuple(coords);

    mapInstance.flyTo({
      ...coords && { center },
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

}

export { MapUtils };
