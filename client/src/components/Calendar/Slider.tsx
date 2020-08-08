// Libs
import React, {
  FC,
  useRef,
  useState,
  memo,
  useEffect,
  createRef, useCallback,
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
import { useCalendar } from "@stores/CalendarStore";

// Constants
import { DRAG_STATUS, SLIDER_MARGIN } from "@components/Calendar/constants";

// Components
import { Slide } from "@components/Calendar/Slide/Slide";

import { TimeMarker } from "@stores/CalendarStore/types";
import { getCurrentTimeMarker } from "@components/Calendar/utils/getCurrentTimeMarker";
import { getSlideData } from "@components/Calendar/utils/getSlideData";
import { getTimestamp } from "@components/Calendar/utils/getTimestamp";
import { getTimeMarker } from "@components/Calendar/utils/getTimeMarker";
import { CalendarEvent } from "@components/Calendar/types";
import { useCallbackRef } from "@utils/hooks/useCallbackRef";

/**
 * Slider
 */
const Slider: FC<any> = memo(({ data }: { data: CalendarEvent[] }) => {

  /**
   * Hooks
   */
  const {
    timeScale,
    centerTimeMarker,
    setCenterTimeMarker,
    xPosition,
  } = useCalendar();

  // @ts-ignore
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const centerSlideRef = useRef<HTMLDivElement>(null);

  const [dragStatus, setDragStatus] = useState(DRAG_STATUS.NONE);

  const isDragging = useRef<boolean>(false);

  const { windowWidth, windowHeight } = useWindowSize();
  const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

  // const [leftTimeMarker, setLeftTimeMarker] = useState();
  // const [rightTimeMarker, setRightTimeMarker] = useState();
  // const [rightTimeMarker, setRightTimeMarker] = useState();

  /**
   * Variables
   */
  const currentTimeMarker = getCurrentTimeMarker(timeScale, 0);

  const leftTimeMarker = centerTimeMarker
    ? getTimeMarker({
      start: getTimestamp(centerTimeMarker.start, timeScale, -1),
      end: centerTimeMarker.start,
      x: centerTimeMarker.x - slideWidth,
    })
    : undefined;

  const rightTimeMarker = centerTimeMarker
    ? getTimeMarker({
      start: centerTimeMarker.end,
      end: getTimestamp(centerTimeMarker.end, timeScale, 1),
      x: centerTimeMarker.x + slideWidth,
    })
    : undefined;

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

    // if (!isDragging || !inView) {
    //   return;
    // }

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
    const observer = new MutationObserver(updateSlide);

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

  /**
   * Handlers
   */
  function updateSlide(e) {

    const centerSlideBBox = e[0].target.getBoundingClientRect();

    if (centerSlideBBox.x > windowWidth / 2) {
      console.log("@@@ Left slide is new center");
      setCenterTimeMarker({
        ...leftTimeMarker,
        x: centerSlideBBox.x,
      });
    }
    if (centerSlideBBox.x < -windowWidth / 2) {
      console.log("@@@ Right slide is new center");
      setCenterTimeMarker({
        ...rightTimeMarker,
        x: centerSlideBBox.x,
      });
    }
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

    if (!leftTimeMarker) {
      return;
    }

    invariant(leftTimeMarker, "Couldn't create a left TimeMarker");

    const slideData = getSlideData(data, leftTimeMarker.start, leftTimeMarker.end);

    return (
      <Slide
        data={slideData}
        marker={leftTimeMarker}
        timeScale={timeScale}
      />
    );
  };

  const renderCenterSlide = () => {
    if (!centerTimeMarker) {
      return;
    }

    const slideData = getSlideData(data, centerTimeMarker.start, centerTimeMarker.end);

    return (
      <Slide
        data={slideData}
        marker={centerTimeMarker}
        timeScale={timeScale}
      />
    );
  };

  const renderRightSlide = () => {
    if (!rightTimeMarker) {
      return;
    }

    invariant(rightTimeMarker, "Couldn't create a left TimeMarker");

    const slideData = getSlideData(data, rightTimeMarker.start, rightTimeMarker.end);

    return (
      <Slide
        data={slideData}
        marker={rightTimeMarker}
        timeScale={timeScale}
      />
    );
  };

  const renderSlides = () => {
    return (
      <>
        {renderLeftSlide()}
        {renderCenterSlide()}
        {renderRightSlide()}
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
