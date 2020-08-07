// Libs
import React, { FC, useRef, memo } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Utils
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { getRandomHEX } from "@utils/getRandomHEX";

// Styles
import classNames from "./styles.module.scss";

// Constants
import { SLIDER_MARGIN } from "@components/Calendar/constants";
import { TimeSegments } from "@stores/CalendarStore";

import { getEventMap } from "@components/Calendar/utils/getEventMap";

export type SlideProps = any;

/**
 * Slide
 */
const Slide: FC<SlideProps> = memo((props) => {

  const {
    idx,
    cb,
    timeScale,
    data,
    marker,
  } = props;

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

  const { segmentPeriod, segmentCount } = TimeSegments[timeScale];

  const { eventMap, mapHeight } = getEventMap(data, marker.start, segmentPeriod) || {};

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
   * Return JSX
   */

  return (
    <div
      ref={slideRef}
      style={{
        gridTemplateRows: `repeat(${mapHeight}, 1fr)`,
        gridTemplateColumns: `repeat(${segmentCount}, 1fr)`,
        width: `${slideWidth}px`,
        left: `${idx * slideWidth}px`,
      }}
      className={classNames.slide}
    >
      {[...Array(segmentCount).keys()].map((segment) => {
        const eventsAtSegment = eventMap ? eventMap[segment] : undefined;

        if (eventsAtSegment) {
          return eventsAtSegment.map((e, eventIdxAtSegment) => {
            return (
              <div
                key={`instant-${segmentPeriod}-${e.toString()}`}
                className={classNames.calendarInstant}
                style={{
                  gridColumnStart: segment,
                  // gridColumnEnd: ,
                  gridRowStart: eventIdxAtSegment + 1,
                  // gridRowEnd: ,
                }}
              >
                <div className={classNames.calendarInstantTitle}>
                  {/*Event Title*/}
                </div>
                <motion.div
                  className={classNames.calendarInstantBlob}
                  style={{
                    backgroundColor: getRandomHEX(),
                  }}
                >
                  {/*{format(date, "dd-mm:hh")}*/}
                </motion.div>
              </div>
            );
          });
        }
        else {
          return <div/>;
          // return <div>no event</div>;
        }
      })}
      {/*{data && data.map((date) => {*/}
      {/*  const distanceFromStart = getTimeDifference(marker.start, date, segmentPeriod);*/}
      {/*  return (*/}
      {/*    <div*/}
      {/*      key={`instant-${segmentPeriod}-${date.toString()}`}*/}
      {/*      className={classNames.calendarInstant}*/}
      {/*      style={{*/}
      {/*        gridColumnStart: distanceFromStart,*/}
      {/*        // gridColumnEnd: ,*/}
      {/*        // gridRowStart: ,*/}
      {/*        // gridRowEnd: ,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div className={classNames.calendarInstantTitle}>*/}
      {/*        Event Title*/}
      {/*      </div>*/}
      {/*      <motion.div*/}
      {/*        className={classNames.calendarInstantBlob}*/}
      {/*        style={{*/}
      {/*          backgroundColor: getRandomHEX(),*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        /!*{format(date, "dd-mm:hh")}*!/*/}
      {/*      </motion.div>*/}
      {/*    </div>*/}
      {/*  );*/}
      {/*})}*/}
    </div>
  );
});

export { Slide };
