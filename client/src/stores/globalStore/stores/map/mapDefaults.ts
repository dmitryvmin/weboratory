import { TCoords, TLngLat } from "@common/types";
import { MapStateType } from "@stores/globalStore/stores/map/types";

export const SeattleCoordinates: TCoords = [-122.335167, 47.608013];
export const SeattleLngLat: TLngLat = {
  lng: -122.335167,
  lat: 47.608013,
};

export const MapInitialState: MapStateType = {
  mapCenterCoords: SeattleCoordinates,
  mapInstance: undefined,
  mapRef: null,
  mapZoom: 15,
  mapZoomActive: false,
  mapMoveActive: false,
  animationOptions: {
    duration: 2000,
  },
  mapMarkerRefs: [],
};


export const mapEasingFunctions = {
// start slow and gradually increase speed
  easeInCubic: function(t) {
    return t * t * t;
  },
// start fast with a long, slow wind-down
  easeOutQuint: function(t) {
    return 1 - Math.pow(1 - t, 5);
  },
// slow start and finish with fast middle
  easeInOutCirc: function(t) {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
  },
// fast start with a "bounce" at the end
  easeOutBounce: function(t) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    }
    else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    }
    else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    }
    else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
};