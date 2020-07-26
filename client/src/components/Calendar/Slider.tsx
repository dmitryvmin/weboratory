// Libs
import React, {
  FC,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from "react";
import {
  AnimatePresence,
  animationControls,
  motion,
  motionValue,
  PanInfo,
  useAnimation,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useSpring, animated } from "react-spring";
import { useDrag, useGesture } from "react-use-gesture";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver";

// Styles
import styles from "./styles.module.scss";
import { useCalendar } from "@components/Calendar/store/useCalendar";
import { CalendarPeriodSegments } from "@components/Calendar/store/constants";

const SLIDER_MARGIN = 20;

/**
 * Slide
 */
const Slide: FC<any> = ({ idx }) => {

  /**
   * Hooks
   */
  const { period } = useCalendar();

  const slideRef = useRef<HTMLDivElement>(null);

  const { windowWidth, windowHeight } = useWindowSize();

  // const [inView, entry] = useIntersectionObserver(slideRef, {
  //   threshold: 0,
  // });

  const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

  /**
   * Effects
   */
  // useEffect(() => {
  //   cb(idx);
  // }, [inView]);

  /**
   * Return JSX
   */
  return (
    <div
      ref={slideRef}
      style={{
        width: `${slideWidth}px`,
        left: `${idx * slideWidth}px`,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }}
      className={[styles.slide, styles[`period-${period}`]].join(" ")}
    >
      {/*{[...Array(CalendarPeriodSegments[period].count).keys()].map(i => i + 1).map((s) => {*/}
      {/*  return (*/}
      {/*    <div key={s}>*/}
      {/*      {`${CalendarPeriodSegments[period].segment}-${s}`}*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
      {`${period}-${idx}`}
    </div>
  );
};

export const DRAG_STATUS = {
  NONE: "none",
  DRAG_STARTED: "drag started",
  DRAG_ENDED: "drag ended",
};

/**
 * Slider
 */
const Slider = () => {

  /**
   * Hooks
   */
  const { activeIndex, xPosition } = useCalendar();

  const [inView, setInView] = useState<any>();

  const [slideCount, setSlideCount] = useState<number[]>([0, 1, 2]);

  // @ts-ignore
  const [{ x }, setSpring] = useSpring(() => ({ x: 0 }));

  const dragContainerRef = useRef<HTMLDivElement>(null);

  const { windowWidth, windowHeight } = useWindowSize();

  const [slides, setSides] = useState<any>();

  const [dragStatus, setDragStatus] = React.useState(DRAG_STATUS.NONE);

  const isDragging = React.useRef<boolean>(false);

  const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

  /**
   * Effects
   */
  useEffect(() => {

    if (!isDragging || !inView) {
      return;
    }

    console.log("Sliding", activeIndex);

    // Sliding to right-slide:
    // - add next-right-slide
    // - remove next-left-slide
    if (inView === activeIndex + 1) {
      console.log("Load next-right-slide");
    }

    // Sliding to left-slide:
    // - add next-left-slide
    // - remove next-left-slide
    if (inView === activeIndex - 1) {
      console.log("Load next-left-slide");
    }

  }, [
    inView,
    isDragging,
  ]);

  // On mount
  useEffect(() => {
    if (dragContainerRef.current) {
      setSides(renderSlides());
    }
  }, [dragContainerRef.current]);

  useEffect(() => {
    if (dragContainerRef.current) {
      x.set(
        -slideWidth + (slideWidth * (activeIndex - 1)),
      );
    }
  }, [
    dragContainerRef.current,
    activeIndex,
  ]);

  useEffect(() => {
    const curX = x.get();
    setSpring({
      x: curX + xPosition,
    });
  }, [
    xPosition,
  ]);

  /**
   * Utils
   */
  const updateSlides = (inView) => {
    setInView(inView);
  };

  const renderSlides = () => {
    return slideCount.map((s, idx) => {
      return (
        <Slide
          key={s}
          idx={s}
          cb={updateSlides}
        />
      );
    });
  };

  const handleDragStart = () => {
    console.log("Dragging started");
    // setIsDragging(true);
  };

  const handleDrag = () => {
    console.log("Dragging...");
    if (!isDragging) {
      // setIsDragging(true);
    }
  };

  const handleDragEnd = () => {
    console.log("Dragging ended");
    // setIsDragging(false);
  };

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
   * Return JSX
   */
  return (
    <div
      className={styles.sliderContainer}
      {...dragBind()}
      // onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
      // onDrag={handleDrag}
    >
      <animated.div

        // {...bind()}
        ref={dragContainerRef}
        // animate={controls}
        className={styles.dragContainer}
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
        {slides}
      </animated.div>
    </div>
  );
};

export { Slider };