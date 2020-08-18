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
import { log } from "@dmitrymin/fe-log";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";

// Styles
import classNames from "./styles.module.scss";

// Store

// Constants
import { DRAG_STATUS, SLIDER_MARGIN } from "@components/Calendar/constants";

// Components
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { SliderProps } from "@components/Calendar/Slider/types";
import { useCalendar } from "@components/Calendar/store";
import { Year } from "@components/Calendar/Year";
import { useTimeTable } from "@components/Calendar/utils/useTimeTable/useTimeTable";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

/**
 * Slider
 */
const Slider: FC<SliderProps> = memo(({
  eventsData,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Context hooks
   */
  const {
    slideCount,
    timePeriod,
    // xPosition,
    calendarMarker,
    // intervalData,
    setSlideCount,
    setSlideWidth,
    slideWidth,
    setCalendarMarker,
  } = useCalendar();

  /**
   * Component hooks
   */
  const [slidesTraveled, setSlidesTraveled] = useState<number>(0);

  const slidesTraveledRef = useRef<number>(0);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const isDragging = useRef<boolean>(false);

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const timeTable = useTimeTable(calendarMarker, timePeriod, slideCount, eventsData);

  /**
   * Util hooks
   */
    // @ts-ignore
  const [{ x: xDistance }, setSpring] = useSpring(() => ({ x: 0 }));

  const { windowWidth } = useWindowSize();

  /**
   * Effects
   */
  useEffect(() => {

    let visibleSlides;

    // 1 Slide
    if (windowWidth < 600) {
      visibleSlides = 1;
    }
    // 2 Slides
    else if (windowWidth < 1000) {
      visibleSlides = 2
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

  // useEffect(() => {
  //   debugger;
  // }, [
  //   timeTable,
  // ]);
  // useEffect(() => {
  //   debugger;
  // }, [
  //   calendarMarker,
  // ]);
  // useEffect(() => {
  //   debugger;
  // }, [
  //   slideCount,
  // ]);
  // useEffect(() => {
  //   debugger;
  // }, [
  //   slideWidth,
  // ]);
  // useEffect(() => {
  //   debugger;
  // }, [
  //   slidesTraveled,
  // ]);

  // Update calendarMarker when slidesTraveled changes
  useEffect(() => {
    console.log("slides traveled");

    if (slidesTraveled === slidesTraveledRef.current) {
      return;
    }

    const segmentDelta = slidesTraveledRef.current - slidesTraveled;
    const newCalendarMarker = getTimestamp(calendarMarker, timePeriod, segmentDelta);

    setCalendarMarker(newCalendarMarker);

    slidesTraveledRef.current = slidesTraveled;

  }, [
    slidesTraveled,
  ]);

  useEffect(() => {

    // if (!isDragging || !inView) {
    //   return;
    // }

    console.log("Sliding");

    // Sliding to right-slide:
    // - add next-right-slide
    // - remove next-left-slide
    // if (inView === activeIndex + 1) {
    //     //   console.log("Load next-right-slide");
    //     // }

    // Sliding to left-slide:
    // - add next-left-slide
    // - remove next-left-slide
    // if (inView === activeIndex - 1) {
    //   console.log("Load next-left-slide");
    // }

  }, [
    // inView,
    isDragging,
  ]);

  // useEffect(() => {
  //   if (dragContainerRef.current) {
  //     // x.set(
  //     //   -slideWidth + (slideWidth * (activeIndex - 1)),
  //     // );
  //   }
  // }, [
  //   dragContainerRef.current,
  //   centerTimeMarker,
  // ]);

  // useEffect(() => {
  //   setSpring({
  //     x: xDistance.get(),
  //   });
  // }, [
  //   xPosition,
  // ]);

  // Create an observer instance for the center slide
  // useEffect(() => {
  //   const dragEl = dragContainerRef.current;
  //
  //   if (!dragEl || dragEl) {
  //     return;
  //   }
  //
  //   const observer = new MutationObserver(onDragContainerUpdate);
  //
  //   // Start observing the target node for configured mutations
  //   observer.observe(dragEl, {
  //     attributes: true,
  //     attributeFilter: ["style"],
  //     childList: false,
  //     subtree: false,
  //   });
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [
  //   dragContainerRef.current,
  // ]);

  // const dragContainerRef = useCallbackRef(null, (node) => {
  //   debugger;
  // });

  function onDragContainerUpdate(e) {
    log("$$", onDragContainerUpdate);
  }

  /**
   * Handlers
   */
  // function updateSlide(e) {
  //
  //   const centerSlideBBox = e[0].target.getBoundingClientRect();
  //
  //   if (centerSlideBBox.x > windowWidth / 2) {
  //     console.log("@@@ Center slide 50% Left");
  //
  //   }
  //   if (centerSlideBBox.x < -windowWidth / 2) {
  //     console.log("@@@ Center slide 50% Right");
  //
  //   }
  // }

  function handleDragStart() {
    console.log("Dragging started");
    // setIsDragging(true);
  }

  function handleDrag() {
    console.log("Dragging...");
    if (!isDragging) {
      // setIsDragging(true);
    }
  }

  function handleDragEnd() {
    console.log("Dragging ended");
    // setIsDragging(false);
  }

  function updateSlidesTraveled(xDelta: number) {
    const newSlidesTraveled = Math.round(xDelta / slideWidth);
    if (slidesTraveled === newSlidesTraveled) {
      return;
    }
    setSlidesTraveled(newSlidesTraveled);
  }

  // Set the drag hook and define component movement based on gesture data
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
        initial: () => [xDistance.get(), 0],
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
    for (const year in timeTable) {
      const yearContent = timeTable[year];
      if (!yearContent) {
        return null;
      }
      const segmentDate = { YEAR: parseInt(year) };
      return (
        <Year
          key={`year-${getDateFromMap(segmentDate)}`}
          date={segmentDate}
          content={yearContent}
          timePeriod={timePeriod}
          slideWidth={slideWidth}
          calendarMarker={calendarMarker}
        />
      );
    }
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

      // style={{
      //   width: sliderWidth,
      //   x,
      // }}

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
          x: xDistance,
        }}
      >
        {renderTimetable()}
      </animated.div>
    </div>
  );
});

export { Slider };
