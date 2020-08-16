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
import { useCalendar } from "@stores/CalendarStore";

// Constants
import { DRAG_STATUS, SLIDER_BUFFER } from "@components/Calendar/constants";

// Components
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { getTimeTable } from "@components/Calendar/utils/getTimeTable";
import { getBaseDate } from "@components/Calendar/utils/getBaseDate";
import { checkProps } from "@utils/react/checkProps";
import { Content } from "@components/Calendar/Content/Content";
import {
  EventsDataMap,
  getEventsAtTimeScaleForInterval,
} from "@components/Calendar/utils/getEventsAtTimeScaleForInterval";

type SliderProps = {
  eventsData: EventsDataMap;
};

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
    xPosition,
    calendarMarker,
    // intervalData,
    setSlideCount,
  } = useCalendar();

  /**
   * Component hooks
   */
  const [timeTable, setTimeTable] = useState<any>();

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const isDragging = useRef<boolean>(false);

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const sliderRef = (node: HTMLDivElement) => {
    if (node === null) {
      return;
    }
  };

  /**
   * Util hooks
   */
  // @ts-ignore
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const { windowWidth } = useWindowSize();

  /**
   * Effects
   */
  useEffect(() => {

    // 1 Slide
    if (windowWidth < 600) {
      setSlideCount(1);
    }
    // 2 Slides
    else if (windowWidth < 1000) {
      setSlideCount(2);
    }
    // 3 slides - max 1140
    else {
      setSlideCount(3);
    }

  }, [
    windowWidth,
  ]);

  useEffect(() => {

    if (!calendarMarker || !timePeriod || slideCount === undefined) {
      return;
    }

    const timeRangeStart = getTimestamp(calendarMarker, timePeriod, -SLIDER_BUFFER);
    const timeTableFloor = getBaseDate(timeRangeStart, timePeriod, "floor");

    const timeRangeEnd = getTimestamp(calendarMarker, timePeriod, slideCount + SLIDER_BUFFER);
    const timeTableCeiling = getBaseDate(timeRangeEnd, timePeriod, "ceiling");

    const eventsDataMap = getEventsAtTimeScaleForInterval({
      eventsData,
      intervalStart: timeTableFloor,
      intervalEnd: timeTableCeiling,
    });

    const _timetable = getTimeTable({
      eventsDataMap,
      timeTableFloor,
      timeTableCeiling,
    });

    setTimeTable(_timetable);

  }, [
    slideCount,
    // calendarMarker,
    // timeScale,
    // slideCount,
  ]);



  // Set up slides based on the timeScale
  // useEffect(() => {
  //   if (slides.length === 0) {
  //     const currentTimeMarker = getCurrentTimeMarker(timeScale, 0);
  //
  //     const leftTimeMarker = getTimeMarker({
  //       start: getTimestamp(currentTimeMarker.start, timeScale, -1),
  //       end: currentTimeMarker.start,
  //       x: currentTimeMarker.x - slideWidth,
  //     });
  //
  //     const rightTimeMarker = getTimeMarker({
  //       start: currentTimeMarker.end,
  //       end: getTimestamp(currentTimeMarker.end, timeScale, 1),
  //       x: currentTimeMarker.x + slideWidth,
  //     });
  //
  //     setSlides([
  //       leftTimeMarker,
  //       currentTimeMarker,
  //       rightTimeMarker,
  //     ]);
  //   }
  // }, []);

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

  useEffect(() => {
    setSpring({
      x: x.get() + xPosition,
    });
  }, [
    xPosition,
  ]);

  // Create an observer instance for the center slide
  useEffect(() => {
    const dragEl = dragContainerRef.current;

    if (!dragEl || dragEl) {
      return;
    }

    const observer = new MutationObserver(onDragContainerUpdate);

    // Start observing the target node for configured mutations
    observer.observe(dragEl, {
      attributes: true,
      attributeFilter: ["style"],
      childList: false,
      subtree: false,
    });
    return () => {
      observer.disconnect();
    };
  }, [
    dragContainerRef.current,
  ]);

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
    return (
      checkProps(
        <Content
          timeTable={timeTable}
          // data={intervalData}
        />,
      )
    );
  };

  /**
   * Render Component
   */
  return (
    <div
      className={classNames.sliderContainer}
      {...dragBind()}
      ref={sliderRef}
      // onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
      // onDrag={handleDrag}
    >
      <animated.div

        // {...bind()}
        ref={dragContainerRef}
        // animate={controls}
        className={classNames.dragContainer}
        // whileTap={{ cursor: "grabbing" }}
        // drag="x"

        style={{
          // width: windowWidth * 3,
          x,
        }}

        // onPanStart={handleDragStart}

        // onDrag={
        //   (event, info) => {
        //     // console.log(info.point.x, info.point.y)
        //   }
        // }
      >
        {renderTimetable()}
      </animated.div>
    </div>
  );
});

export { Slider };
