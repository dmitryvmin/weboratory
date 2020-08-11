// Libs
import React, {
  FC,
  useRef,
  useState,
  memo,
  useEffect,
  createRef, useCallback, useMemo, ReactNode, ReactElement,
} from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import invariant from "invariant";
import { log } from "@dmitrymin/fe-log";
import { format, getDay, getDaysInMonth, getHours, getMinutes, getMonth, getYear } from "date-fns";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { createMockData } from "@components/Calendar/__tests__/utils";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver";

// Styles
import classNames from "./styles.module.scss";

// Store
import { useCalendar } from "@stores/CalendarStore";

// Constants
import { DRAG_STATUS, SLIDER_MARGIN } from "@components/Calendar/constants";

// Components
import { Slide } from "@components/Calendar/Slide/Slide";

import { TimeMarker } from "@stores/CalendarStore/types";
import { getCurrentTimeMarker } from "@components/Calendar/utils/getCurrentTimeMarker";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { getTimeMarker } from "@components/Calendar/utils/getTimeMarker";
import { CalendarEvent } from "@components/Calendar/types";
import { useCallbackRef } from "@utils/hooks/useCallbackRef";
import { TimeTable } from "@components/Calendar/utils/TimeTable";
import { Content } from "@components/Calendar/Content";
import { getIntervalData } from "@components/Calendar/utils/getIntervalData";
import { checkProps } from "@utils/react/checkProps";
import { Text } from "@components/UI/Text";

/**
 * Slider
 */
const Slider: FC<any> = memo(({ data }: { data: CalendarEvent[] }) => {

  /**
   * Hooks
   */
  const {
    timeScale,
    xPosition,
    calendarMarker,
    intervalData,
    setIntervalData,
  } = useCalendar();

  // @ts-ignore
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const centerSlideRef = useRef<HTMLDivElement>(null);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const isDragging = useRef<boolean>(false);

  const [slides, setSlides] = useState<TimeMarker[]>([]);

  const [timeTable, setTimeTable] = useState<any>();

  const { windowWidth, windowHeight } = useWindowSize();

  const [slideWidth, setSlideWidth] = useState<number>(400);

  const [slideCount, setSlideCount] = useState<number>(1);

  const sliderRef = (node: HTMLDivElement) => {
    if (node === null) {
      return;
    }
  };

  /**
   * Effects
   */
  useEffect(() => {

    // 1 Slide
    if (windowWidth < 400) {
      setSlideCount(3);
      const _slideWidth = (windowWidth - (4 * SLIDER_MARGIN));
      setSlideWidth(slideWidth);
    }
    // 2 Slides
    else if (windowWidth < 840) {
      setSlideCount(4);
      const _slideWidth = (windowWidth - (4 * SLIDER_MARGIN)) / 2;
      setSlideWidth(slideWidth);
    }
    // 3 slides - max 1140
    else {
      setSlideCount(5);
      const _slideWidth = (windowWidth - (4 * SLIDER_MARGIN)) / 3;
      setSlideWidth(slideWidth);
    }

  }, [
    windowWidth,
  ]);


  useEffect(() => {

    if (!calendarMarker || !timeScale) {
      return;
    }

    const timeRangeStart = getTimestamp(calendarMarker, timeScale, -slideCount);
    const timeRangeEnd = getTimestamp(calendarMarker, timeScale, slideCount);

    const _intervalData = getIntervalData(data, timeRangeStart, timeRangeEnd);
    setIntervalData(_intervalData);
debugger;
    const _timeTable = new TimeTable();
    _timeTable.createTable({
      timeScale,
      timeRangeStart,
      timeRangeEnd
    });
    setTimeTable(_timeTable.timetable);

  }, [
    calendarMarker,
    timeScale,
    slideCount
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

    if (!dragEl) {
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
          data={intervalData}
          timeScale={timeScale}
          calendarMarker={calendarMarker}
          slideWidth={slideWidth}
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
