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
import { motion } from "framer-motion";
import { log } from "@dmitrymin/fe-log";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Hooks
import { useTimeTable } from "@components/Calendar/hooks/useTimeTable/useTimeTable";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { useEventsData } from "@stores/EventsDataStore/useEventsData";

// Constants
import { SLIDER_MARGIN } from "@components/Calendar/constants";
import { DRAG_STATUS } from "@common/constants";

// Components
import { Slide } from "@components/Calendar/Slide/Slide";

// Types
import { SliderProps } from "@components/Calendar/Slider/types";
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

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
    startingDate,
    currentDate,
    xDistance,
    isFullScreen,
  } = useCalendar();

  const {
    setAllEventsData,
    setIntervalEventsDataMap,
    eventsData,
  } = useEventsData();

  const timeTable = useTimeTable({
    currentDate,
    timePeriod,
    slideCount,
  });

  /**
   * Component hooks
   */
  const [slidesTraveled, setSlidesTraveled] = useState<number>(0);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const slidesTraveledRef = useRef<number>(0);

  const isDragging = useRef<boolean>(false);

  const dragContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Lib hooks
   */
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const { windowWidth } = useWindowSize();

  /**
   * Effects
   */
  useEffect(() => {
    setAllEventsData();
  }, []);

  useEffect(() => {
    setIntervalEventsDataMap(timePeriod, currentDate);
  }, [
    eventsData,
    currentDate,
    timePeriod,
  ]);

  useEffect(() => {
    const xDelta = x.get() + xDistance.distance;
    setSpring({
      x: xDelta,
      config: {
        velocity: xDistance.velocity,
        duration: 500,
      }
    });
    updateSlidesTraveled(xDelta);
  }, [
    xDistance,
  ]);

  useEffect(() => {

    let visibleSlides;

    // 1 Slide
    if (windowWidth < 600) {
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

    setSlideCount(visibleSlides);

    const slideWidth = (windowWidth - (2 * SLIDER_MARGIN)) / slideCount;

    setSlideWidth(slideWidth);

  }, [
    windowWidth,
  ]);

  // Update calendarMarker when slidesTraveled changes
  useEffect(() => {
    if (slidesTraveled === slidesTraveledRef.current) {
      return;
    }

    const segmentDelta = slidesTraveledRef.current - slidesTraveled;
    const newCurrentDate = getDateAdjustedBy(currentDate, timePeriod, segmentDelta);

    setCurrentDate(newCurrentDate);
    slidesTraveledRef.current = slidesTraveled;

  }, [
    slidesTraveled,
  ]);

  /**
   * Utils
   */
  function updateSlidesTraveled(xDelta: number) {
    const newSlidesTraveled = Math.round(xDelta / slideWidth);
    if (slidesTraveled === newSlidesTraveled) {
      return;
    }
    setSlidesTraveled(newSlidesTraveled);
  }

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
          calendarTimePeriod={timePeriod}
          calendarStartingDate={startingDate}
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
      // {...bind()}
      ref={dragContainerRef}
      // animate={controls}
      className={classNames.dragContainer}
      // whileTap={{ cursor: "grabbing" }}
      // drag="x"

      // initial="docked"
      // variants={sliderContainerVariants}
      // animate={isFullScreen ? "fullScreen" : "docked"}

      // onPanStart={handleDragStart}

      // onDrag={
      //   (event, info) => {
      //     // console.log(info.point.x, info.point.y)
      //   }
      // }
    >
      <animated.div
        // {...bind()}
        // ref={dragContainerRef}
        // animate={controls}
        className={classNames.slidesContainer}
        // whileTap={{ cursor: "grabbing" }}
        // drag="x"
        style={{
          // width: windowWidth * 3,
          x,
        }}
      >
        {renderTimetable()}
      </animated.div>
    </div>
  );
});

export { Slider };
