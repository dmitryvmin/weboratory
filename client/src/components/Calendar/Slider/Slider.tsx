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

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Hooks
import { useTimeTable } from "@components/Calendar/hooks/useTimeTable/useTimeTable";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { useEventsData } from "@stores/EventsDataStore/useEventsData";

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
import { format } from "date-fns";
import { motion } from "framer-motion";
import { TimePeriod } from "@components/Calendar/common/types";
import { getStartOfPeriod } from "@components/Calendar/utils/getStartOfPeriod";
import { SET_CAL_CURRENT_DATE, SET_CAL_TIME_PERIOD } from "@stores/globalStore/constants/calendar";
import { setCalTimePeriod, setCalStartDate, setCalCurrentDate } from "@stores/globalStore/actions/calendar";

/**
 * Slider
 */
const Slider: FC<SliderProps> = memo(() => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Context hooks
   */
  const {
    slideCount,
    timePeriod,
    setSlideCount,
    setSlideWidth,
    slideWidth,
    setCurrentDate,
    currentDate,
    startingDate,
    setStartingDate,
    xDistance,
    setXDistance,
    isFullScreen,
  } = useCalendar();

  const {
    setIntervalEventsDataMap,
  } = useEventsData();

  const timeTable = useTimeTable({
    currentDate,
    timePeriod,
    slideCount,
  });

  const dispatch = useDispatch();

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
    dispatch(setCalCurrentDate(currentDate));
  }, [
    currentDate,
  ]);

  useEffect(() => {
    dispatch(setCalTimePeriod(timePeriod));
  }, [
    timePeriod,
  ]);

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
    setSlideWidth(slideWidth);

  }, [
    windowWidth,
  ]);

  // When Slider xDistance is updated
  useEffect(() => {
    if (!xDistance.distance) {
      return;
    }
    const xDelta = x.get() + (xDistance.distance * -1);
    updateSlidesTraveled(xDelta);
    updateSpring(xDelta, xDistance.duration, xDistance.velocity);
  }, [
    xDistance,
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
    if (timePeriodRef.current === timePeriod) {
      return;
    }
    // Get start date for the timePeriod
    setStartingDate(getStartOfPeriod(timePeriod, currentDate));
    // Reset xDistance, if it's been updated
    setXDistance({ distance: 0, duration: 0 });
    // Reset slides traveled
    updateSlidesTraveled(null);
    // Reset the drag container
    updateSpring(0, 0);

    timePeriodRef.current = timePeriod;
  }, [
    timePeriod,
  ]);

  /**
   * State Setters
   */
  function updateCurrentDate(slideTraveledPrev, slidesTraveledNext) {
    const slidesTraveledDelta = slideTraveledPrev - slidesTraveledNext;
    const newCurrentDate = getDateAdjustedBy(currentDate, timePeriod, slidesTraveledDelta);

    if (newCurrentDate === currentDate) {
      return;
    }

    console.log("@@ updateCurrentDate", slidesTraveledDelta, newCurrentDate);
    slidesTraveledRef.current = slidesTraveledNext;
    setCurrentDate(newCurrentDate);
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
          slideWidth={slideWidth}
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
