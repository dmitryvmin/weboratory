// Libs
import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// App
import { setSlideCount, setSliderXDistance, setSlideWidth } from "@stores/globalStore/stores/slider/sliderActions";
import { getSlideCount, getSliderXDistance, getSlideWidth } from "@stores/globalStore/stores/slider/sliderSelectors";

/**
 * Map store facade
 */
export function useSliderStore() {

  /**
   * Redux map state and dispatch
   */
  const dispatch = useDispatch();

  /**
   * Selectors
   */
  const slideCount = useSelector(getSlideCount);

  const slideWidth = useSelector(getSlideWidth);

  const sliderXDistance = useSelector(getSliderXDistance);

  /**
   * Dispatchers
   */
  const _setSliderXDistance = useCallback(
    (sliderXDistance) => dispatch(setSliderXDistance(sliderXDistance)),
    [dispatch],
  );

  const _setSlideCount = useCallback(
    (slideCount: number) => dispatch(setSlideCount(slideCount)),
    [dispatch],
  );

  const _setSlideWidth = useCallback(
    (slideWidth: number) => dispatch(setSlideWidth(slideWidth)),
    [dispatch],
  );

  return ({
    slideCount,
    slideWidth,
    sliderXDistance,
    setSlideCount: _setSlideCount,
    setSlideWidth: _setSlideWidth,
    setSliderXDistance: _setSliderXDistance,
  });
}