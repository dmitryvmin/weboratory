// Libs
import React, {
  useRef,
  useState,
  memo,
  useEffect,
} from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import invariant from "invariant";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { createMockData } from "@components/Calendar/__tests__/utils";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver";

// Styles
import classNames from "./styles.module.scss";

// Store
import { TimeSegments, useCalendar } from "@stores/CalendarStore";

// Constants
import { DRAG_STATUS, SLIDER_MARGIN } from "@components/Calendar/constants";

// Components
import { Slide } from "@components/Calendar/Slide";

import { TimeMarker } from "@stores/CalendarStore/types";
import { getCurrentTimeMarker } from "@components/Calendar/utils/getCurrentTimeMarker";
import { getSlideData } from "@components/Calendar/utils/getSlideData";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { getTimeMarker } from "@components/Calendar/utils/getTimeMarker";

const mockData = createMockData();

/**
 * Slider
 */
const Slider = memo(() => {

  /**
   * Hooks
   */
  const {
    timeScale,
    centerTimeMarker,
    setCenterTimeMarker,
    xPosition,
  } = useCalendar();

  const [inView, setInView] = useState<any>();

  // @ts-ignore
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const isDragging = useRef<boolean>(false);

  // const { windowWidth, windowHeight } = useWindowSize();
  // const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

  /**
   * Variables
   */
  const currentTimeMarker = getCurrentTimeMarker(timeScale);

  /**
   * Effects
   */
  // Set up slides based on the timeScale
  useEffect(() => {
    if (centerTimeMarker === undefined) {
      setCenterTimeMarker(currentTimeMarker);
    }
  }, [
    timeScale,
  ]);

  useEffect(() => {

    if (!isDragging || !inView) {
      return;
    }

    console.log("Sliding", centerTimeMarker);

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
    inView,
    isDragging,
  ]);

  useEffect(() => {
    if (dragContainerRef.current) {
      // x.set(
      //   -slideWidth + (slideWidth * (activeIndex - 1)),
      // );
    }
  }, [
    dragContainerRef.current,
    centerTimeMarker,
  ]);

  useEffect(() => {
    setSpring({
      x: x.get() + xPosition,
    });
  }, [
    xPosition,
  ]);

  /**
   * Handlers
   */
  function updateSlide(inView) {
    // setInView(inView);
  }

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
  const renderLeftSlide = () => {

    if (!centerTimeMarker || !centerTimeMarker.start || !centerTimeMarker.end) {
      return;
    }

    const timeMarker = getTimeMarker({
      start: getTimestamp(centerTimeMarker.start, timeScale, -1),
      end: centerTimeMarker.start,
      idx: -1,
    });

    invariant(timeMarker, "Couldn't create a left TimeMarker");

    const data = getSlideData(mockData, timeMarker.start, timeMarker.end);

    return (
      <Slide
        {...timeMarker}
        {...data}
        cb={updateSlide}
        timeScale={timeScale}
      />
    );
  };

  const renderCenterSlide = () => {
    if (!centerTimeMarker || !centerTimeMarker.start || !centerTimeMarker.end) {
      return;
    }

    const data = getSlideData(mockData, centerTimeMarker.start, centerTimeMarker.end);

    return (
      <Slide
        marker={centerTimeMarker}
        cb={updateSlide}
        timeScale={timeScale}
        data={data}
      />
    );
  };

  const renderRightSlide = () => {
    if (!centerTimeMarker || !centerTimeMarker.start || !centerTimeMarker.end) {
      return;
    }

    const timeMarker = getTimeMarker({
      start: centerTimeMarker.end,
      end: getTimestamp(centerTimeMarker.end, timeScale, 1),
      idx: 1,
    });

    invariant(timeMarker, "Couldn't create a left TimeMarker");

    const data = getSlideData(mockData, timeMarker.start, timeMarker.end);

    return (
      <Slide
        cb={updateSlide}
        timeScale={timeScale}
      />
    );
  };

  const renderSlides = () => {
    return (
      <>
        {/*{renderLeftSlide()}*/}
        {renderCenterSlide()}
        {/*{renderRightSlide()}*/}
      </>
    );
  };

  /**
   * Render Component
   */
  return (
    <div
      className={classNames.sliderContainer}
      {...dragBind()}
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
        {renderSlides()}
      </animated.div>
    </div>
  );
});

export { Slider };
