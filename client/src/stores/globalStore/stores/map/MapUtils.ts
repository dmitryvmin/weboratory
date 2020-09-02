import { MapEaseToOptionsType, MapFlyToOptionsType, MapMoveOptionsType } from "@stores/globalStore/stores/map/types";
import { getLngLatTuple } from "@components/Events/utils/getLngLatTuple";
import { FlyToOptions, LngLatBoundsLike, PaddingOptions } from "mapbox-gl";

/**
 * Map Utility Class
 */
class MapUtils {

  // https://docs.mapbox.com/mapbox-gl-js/api/map/#map#easeto
  public static easeMapTo(options: MapEaseToOptionsType) {
    const {
      mapInstance,
      coords,
      center,
      padding,
    } = options;

    const _center = center ?? getLngLatTuple(coords!);
    const _padding = { top: 0, right: 0, bottom: 0, left: 0, ...padding };

    mapInstance.easeTo({
      ...options,
      center: _center,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      padding: _padding,
    });
  }

  public static mapFlyTo(options: MapFlyToOptionsType) {
    const {
      mapInstance,
      coords,
      padding,
      center,
    } = options;

    const _center = center ?? getLngLatTuple(coords!);
    const _padding = { top: 0, right: 0, bottom: 0, left: 0, ...padding };

    mapInstance.flyTo({
        ...options,
        center: _center,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        padding: _padding,
      },
    );
  }

  public static fitMapToData({
    mapInstance,
    bounds,
    options,
  }: {
    mapInstance: any;
    bounds: LngLatBoundsLike;
    options: FlyToOptions;
  }) {
    mapInstance.fitBounds(bounds, options);
  }

  public static setMapPadding({
    mapInstance,
    mapPadding,
  }: {
    mapInstance: any;
    mapPadding: PaddingOptions;
  }) {
    mapInstance.setPadding(mapPadding);
  }
}

export { MapUtils };
