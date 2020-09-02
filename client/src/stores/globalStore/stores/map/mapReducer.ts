import {
  MAP_ANIMATION_OPTIONS,
  MAP_CENTER_COORDS,
  MAP_CENTER_ON_ADDRESS,
  MAP_CENTER_ON_CLIENT,
  MAP_FLY_TO,
  MAP_INSTANCE, MAP_MARKER_REFS,
  MAP_MOVE_ACTIVE,
  MAP_PADDING,
  MAP_REF,
  MAP_ZOOM,
  MAP_ZOOM_ACTIVE,
} from "@stores/globalStore/stores/map/mapConstants";

import { MapInitialState } from "@stores/globalStore/stores/map/mapDefaults";
import { MapUtils } from "@stores/globalStore/stores/map/MapUtils";

function mapReducer(state = MapInitialState, action) {

  switch (action.type) {
    case MAP_CENTER_COORDS:
      return ({
        ...state,
        mapCenterCoords: action.mapCenterCoords,
      });

    case MAP_INSTANCE:
      return ({
        ...state,
        mapInstance: action.mapInstance,
      });

    case MAP_REF:
      return ({
        ...state,
        mapRef: action.mapRef,
      });

    case MAP_MARKER_REFS:
      return ({
        ...state,
        mapMarkerRefs: action.mapMarkerRefs,
      });

    case MAP_ZOOM:
      return ({
        ...state,
        mapZoom: action.mapZoom,
      });

    case MAP_PADDING:
      return ({
        ...state,
        mapPadding: action.mapPadding,
      });

    case MAP_ZOOM_ACTIVE:
      return ({
        ...state,
        mapZoomActive: action.mapZoomActive,
      });

    case MAP_MOVE_ACTIVE:
      return ({
        ...state,
        mapMoveActive: action.mapMoveActive,
      });

    case MAP_ANIMATION_OPTIONS:
      return ({
        ...state,
        animationOptions: action.animationOptions,
      });

    case MAP_FLY_TO:
      return ({
        ...state,
        flyToOptions: action.flyToOptions,
      });

    case MAP_CENTER_ON_CLIENT:
      return ({
        ...state,
        mapZoomActive: true,
        mapMoveActive: true,
      });

    case MAP_CENTER_ON_ADDRESS:
      return ({
        ...state,
        mapZoomActive: true,
        mapMoveActive: true,
      });

    default:
      return state;
  }
}

export { mapReducer };