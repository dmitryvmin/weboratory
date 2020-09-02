import { sliderConstants } from "@stores/globalStore/stores/slider/sliderConstants";
const {
  SLIDE_COUNT,
  SLIDE_WIDTH,
  SLIDER_X_DISTANCE,
} = sliderConstants;

export function setSliderXDistance(sliderXDistance) {
  return {
    type: SLIDER_X_DISTANCE,
    sliderXDistance,
  };
}

export function setSlideCount(slideCount: number) {
  return {
    type: SLIDE_COUNT,
    slideCount,
  };
}

export function setSlideWidth(slideWidth: number) {
  return {
    type: SLIDE_WIDTH,
    slideWidth,
  };
}
