// App
import { sliderInitialState } from "@stores/globalStore/stores/slider/sliderDefaults";
import { sliderConstants } from "@stores/globalStore/stores/slider/sliderConstants";

const {
  SLIDER_X_DISTANCE,
  SLIDE_COUNT,
  SLIDE_WIDTH,
} = sliderConstants;

function sliderReducer(state = sliderInitialState, action) {
  switch (action.type) {

    case SLIDE_WIDTH:
      return ({
        ...state,
        slideWidth: action.slideWidth,
      });

    case SLIDE_COUNT:
      return ({
        ...state,
        slideCount: action.slideCount,
      });

    case SLIDER_X_DISTANCE:
      return ({
        ...state,
        sliderXDistance: action.sliderXDistance,
      });

    default:
      return state;
  }
}

export { sliderReducer };