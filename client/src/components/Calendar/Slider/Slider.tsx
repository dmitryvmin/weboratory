// Libs
import React, {
  FC,
  useRef,
  useState,
  memo,
  useEffect,
} from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Hooks
import { useTimeTable } from "@components/Calendar/hooks/useTimeTable/useTimeTable";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";

// Constants
import { CurrentDateFormatMap, SLIDER_MARGIN } from "@components/Calendar/constants";
import { DRAG_STATUS } from "@common/constants";

// Components
import { Slide } from "@components/Calendar/Slide/Slide";
import { Text } from "@components/UI/Text";

// Types
import { SliderProps } from "@components/Calendar/Slider/types";
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { TimePeriod } from "@components/Calendar/common/types";
import { getStartOfPeriod } from "@components/Calendar/utils/getStartOfPeriod";
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

/**
 * Slider
 */
const Slider: FC<SliderProps> = memo(() => {

  /**
   * =============== Hooks ===============
   */
  const {
    calTimePeriod,
    calCurrentDate,
    calStartDate,
    slideCount,
    slideWidth,
    sliderXDistance,
    setSlideWidth,
    setSlideCount,
    setCalCurrentDate,
    setCalTimePeriod,
    setCalStartDate,
    setSliderXDistance,
    queryInViewEventsData,
  } = useCalendarStore();

  const timeTable = useTimeTable({
    currentDate: calCurrentDate,
    timePeriod: calTimePeriod,
    slideCount: slideCount,
  });

  /**
   * Component hooks
   */
  const [slidesTraveled, setSlidesTraveled] = useState<number>(0);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const slidesTraveledRef = useRef<number>(0);

  const timePeriodRef = useRef<TimePeriod>();

  const isDragging = useRef<boolean>(false);

  const dragContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Lib hooks
   */
  const [{ x }, setSpring, stopSpring] = useSpring(() => ({ x: 0 }));

  const { windowWidth } = useWindowSize();

  /**
   * Effects
   */
  // Get events for the active slides
  useEffect(() => {
    queryInViewEventsData();
  }, []);

  // windowWidth
  useEffect(() => {

    let visibleSlides;

    // 1 Slide
    if (windowWidth < 680) {
      visibleSlides = 1;
    }
    // 2 Slides
    else if (windowWidth < 1000) {
      visibleSlides = 2;
    }
    // 3 slides - max 1140
    else {
      visibleSlides = 3;
    }

    const slideWidth = (windowWidth - (2 * SLIDER_MARGIN)) / visibleSlides;

    setSlideCount(visibleSlides);
    setSlideWidth(slideWidth)

  }, [
    windowWidth,
  ]);

  // When Slider's xDistance traveled changes,
  // update slides traveled and spring value
  useEffect(() => {
    if (!sliderXDistance?.distance) {
      return;
    }
    const xDelta = x.get() + (sliderXDistance.distance * -1);
    updateSlidesTraveled(xDelta);
    updateSpring(xDelta, sliderXDistance.duration, sliderXDistance.velocity);
  }, [
    sliderXDistance,
  ]);

  // Update calendarMarker when slidesTraveled changes
  useEffect(() => {
    if (slidesTraveled === slidesTraveledRef.current) {
      return;
    }
    else {
      updateCurrentDate(slidesTraveledRef.current, slidesTraveled);
    }
  }, [
    slidesTraveled,
  ]);

  useEffect(() => {
    if (timePeriodRef.current === calTimePeriod) {
      return;
    }
    // Get start date for the timePeriod
    setCalStartDate(getStartOfPeriod(calTimePeriod, calCurrentDate));
    // Reset xDistance, if it's been updated
    setSliderXDistance({ distance: 0, duration: 0 });
    // Reset slides traveled
    updateSlidesTraveled(null);
    // Reset the drag container
    updateSpring(0, 0);

    timePeriodRef.current = calTimePeriod;
  }, [
    calTimePeriod,
  ]);

  /**
   * State Setters
   */
  function updateCurrentDate(slideTraveledPrev, slidesTraveledNext) {
    const slidesTraveledDelta = slideTraveledPrev - slidesTraveledNext;
    const newCurrentDate = getDateAdjustedBy(calCurrentDate, calTimePeriod, slidesTraveledDelta);

    if (newCurrentDate === calCurrentDate) {
      return;
    }

    console.log("@@ updateCurrentDate", slidesTraveledDelta, newCurrentDate);
    slidesTraveledRef.current = slidesTraveledNext;
    setCalCurrentDate(newCurrentDate);
  }

  // When slider moves right, xDelta value is positive
  // When slider moves left, xDelta value is negative
  function updateSlidesTraveled(xDelta: number | null) {
    if (xDelta === null) {
      setSlidesTraveled(0);
      slidesTraveledRef.current = 0;

      console.log("@@ updateSlidesTraveled reset to 0:");
    }
    else {
      const newSlidesTraveled = Math.round(xDelta / slideWidth);
      if (newSlidesTraveled === slidesTraveled) {
        return;
      }

      console.log("@@ updateSlidesTraveled set to", newSlidesTraveled);
      setSlidesTraveled(newSlidesTraveled);
    }
  }

  // function updateSpring({x, config}: typeof useSpring.arguments) {
  function updateSpring(x: number, duration = 0, velocity?: number) {
    setSpring({
      x,
      config: {
        ...velocity && { velocity: velocity },
        duration: duration ?? 0,
      },
    });
  }

  /**
   * Utils
   */
    // Set the drag hook and update Slider movement based on gesture data
  const dragBind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], first, last }) => {
        if (first) {
          isDragging.current = true;
          setDragStatus(DRAG_STATUS.DRAG_STARTED);
        }
        else if (last) {
          requestAnimationFrame(() => (isDragging.current = false));
          setDragStatus(DRAG_STATUS.DRAG_ENDED);
        }
        setSpring({
          // x: down ? mx : 0,
          x: mx,
        });

        updateSlidesTraveled(mx);
      },
    },
    {
      drag: {
        initial: () => [x.get(), 0],
      },
    },
    );

  /**
   * =============== JSX ===============
   */

  /**
   * Render Slides
   */
  const renderTimetable = () => {
    if (!timeTable) {
      return null;
    }
    return Object.keys(timeTable).map((year) => {
      const segmentContent = timeTable[year];
      if (!segmentContent) {
        return null;
      }

      const segmentTimePeriod = "YEAR";
      const segmentDateMap = { [segmentTimePeriod]: parseInt(year) };
      const segmentDate = getDateFromMap(segmentDateMap);

      return (
        <Slide
          key={`ROOT-${segmentTimePeriod}-${segmentDate}`}
          slideTimePeriod={segmentTimePeriod}
          slideDateMap={segmentDateMap}
          slideContent={segmentContent}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <div
      {...dragBind()}
      ref={dragContainerRef}
      className={classNames.dragContainer}
    >
      <animated.div
        className={classNames.slidesContainer}
        style={{
          x,
        }}
      >
        {renderTimetable()}
      </animated.div>
    </div>
  );
});

export { Slider };
