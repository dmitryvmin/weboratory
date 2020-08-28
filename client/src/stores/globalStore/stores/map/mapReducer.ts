import {
  MAP_CENTER_COORDS, MAP_CENTER_ON_ADDRESS, MAP_CENTER_ON_CLIENT,
  MAP_FLY_TO,
  MAP_INSTANCE, MAP_MOVE_ACTIVE,
  MAP_REF,
  MAP_ZOOM,
  MAP_ZOOM_ACTIVE,
  MapInitialState,
} from "@stores/globalStore/stores/map/mapConstants";
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

    case MAP_ZOOM:
      return ({
        ...state,
        mapInstance: action.mapZoom,
      });

    case MAP_ZOOM_ACTIVE:
      return ({
        ...state,
        mapInstance: action.mapZoomActive,
      });

    case MAP_MOVE_ACTIVE:
      return ({
        ...state,
        mapInstance: action.mapMoveActive,
      });

    case MAP_FLY_TO:
      return ({
        ...state,
        mapZoomActive: true,
        mapMoveActive: true,
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