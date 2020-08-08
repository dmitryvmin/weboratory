// Libs
import React, { FC, useRef, memo, useEffect, forwardRef, ForwardRefRenderFunction } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Styles
import classNames from "./styles.module.scss";

// Constants
import { SLIDER_MARGIN } from "@components/Calendar/constants";

// Components
import { Text } from "@components/UI/Text";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { useMutationObserver } from "@utils/hooks/useMutationObserver";
import { getEventMap } from "@components/Calendar/utils/getEventMap";
import { getSegmentsForTimeScale } from "@components/Calendar/utils/getSegmentsForTimeScale";

// Store
import { TimeScaleSegmentMap, TimeFormatMap } from "@stores/CalendarStore";

// Types
import { SlideProps } from "@components/Calendar/Slide/types";
import { useIntersectionObserver } from "@utils/hooks/useIntersectionObserver";

/**
 * Slide
 */
const Slide = forwardRef(
  ({
      timeScale,
      data,
      marker: {
        start,
        end,
        x,
      },
    }: SlideProps,
    centerSlideRef: any,
  ) => {

    /**
     * Hooks
     */
    const slideRef = useRef<HTMLDivElement>(null);

    const { windowWidth, windowHeight } = useWindowSize();

    // const [inView, entry] = useIntersectionObserver(slideRef, {
    //   threshold: 0,
    // });

    /**
     * Variables
     */
    const slideWidth = windowWidth - (SLIDER_MARGIN * 2);

    const segmentScale = TimeScaleSegmentMap[timeScale];

    const segments = getSegmentsForTimeScale(timeScale, start);

    const { eventMap, mapHeight } = getEventMap(data, start, segmentScale) || {};

    /**
     * Utils - move out of the component
     */


    /**
     * Effects
     */
    // useEffect(() => {
    //   cb(idx);
    // }, [inView]);

    /**
     * =============== JSX ===============
     */

    /**
     * Render Segment Events
     */
    const renderSegmentEvents = (segment, events) => {
      if (!events || !events.length) {
        return;
      }
      return events.map((event, eventIdxAtSegment) => {
        return (
          <div
            key={`instant-${segmentScale}-${event.time.toString()}`}
            style={{
              gridRowStart: eventIdxAtSegment,
            }}
            className={classNames.segmentInstant}
          >
            <div className={classNames.segmentInstantTitle}>
              Title
            </div>
            <motion.div
              className={classNames.segmentInstantBlob}
              style={{
                backgroundColor: event.color,
              }}
            >
              {/*{format(date, "dd-mm:hh")}*/}
            </motion.div>
          </div>
        );
      });
    };

    /**
     * Render Component
     */
    return (
      <div
        ref={centerSlideRef}
        style={{
          width: `${slideWidth}px`,
          left: `${x}px`,
          // left: `${idx * slideWidth}px`,
        }}
        className={classNames.slide}
      >
        <div className={classNames.slideLabel}>
          {format(start, TimeFormatMap[timeScale])}
        </div>
        <div
          className={classNames.slideContent}
          style={{
            gridTemplateColumns: `repeat(${segments.length}, 1fr)`,
          }}
        >
          {segments.map((segment) => {
            const eventsAtSegment = eventMap ? eventMap[segment] : undefined;
            return (
              <div
                key={`segment-${segment}`}
                style={{
                  gridColumnStart: segment,
                }}
                className={classNames.segment}
              >
                <div className={classNames.segmentLabel}>
                  <Text>{segment}</Text>
                </div>
                <div
                  style={{
                    gridTemplateRows: `repeat(${mapHeight}, 50px)`,
                  }}
                  className={classNames.segmentContent}
                >
                  {renderSegmentEvents(segment, eventsAtSegment)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export { Slide };
