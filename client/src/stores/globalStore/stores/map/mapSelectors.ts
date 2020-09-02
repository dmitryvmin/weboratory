import { createSelector } from "reselect";

export const getMapRef = state => state.mapReducer.mapRef;

export const getMapInstance = state => state.mapReducer.mapInstance;

export const getMapZoom = state => state.mapReducer.mapZoom;

export const getMapCenterCoords = state => state.mapReducer.mapCenterCoords;

export const getAnimationOptions = state => state.mapReducer.animationOptions;

export const getMapFlyToOptions = state => state.mapReducer.flyToOptions;

export const getMapMarkerRefs = state => state.mapReducer.mapMarkerRefs;

export const getIsMapMaxZoom = state => state.mapReducer.mapZoom === 22;

export const getIsMapMinZoom = state => state.mapReducer.mapZoom === 0;

// export const getVisibleTodos = createSelector(
//   [getVisibilityFilter, getTodos],
//   (visibilityFilter, todos) => {
//     switch (visibilityFilter) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )