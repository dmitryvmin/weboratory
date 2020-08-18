// Libs
import React, { CSSProperties, FC, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils

// UI
import { Text } from "@components/UI/Text";

// Store

// Constants

// Styles
import classNames from "./styles.module.scss";

// Types
import { MyComponentProps } from "./types";
import { Hour } from "@components/Calendar/Hour";
import { DateFormatMap, SLIDER_MARGIN } from "@components/Calendar/constants";
import { differenceInDays, differenceInHours, format } from "date-fns";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";
import { getSegmentIdxFromDate } from "@components/Calendar/utils/getSegmentIdxFromDate";

/**
 *
 */
const Day: FC<MyComponentProps> = memo(({
  date,
  content,
  timePeriod,
  calendarMarker,
  slideWidth,
}) => {

  /**
   * =============== Hooks ===============
   */

  /**
   * Variables
   */
  const isContainer = timePeriod === "HOUR";
  const isSlide = timePeriod === "DAY";
  const className = [
    classNames.segmentDay,
    isSlide && classNames.isAbsolute,
  ].join(" ");


  /**
   * Utils
   */
  const getStyles = () => {
    switch (timePeriod) {
      case "MINUTE":
        return ({});
      case "HOUR":
        return ({
          // backgroundColor: "rgba(255,255,255,0.2)",
        });
      case "DAY":

        // const slideIdx = getSegmentIdxFromDate(timePeriod, calendarMarker, slideDate);
        // const slideX = slideIdx * slideWidth;

        const slideDate = getDateFromMap(date);
        const daysDiff = differenceInDays(getDateFromMap(date), calendarMarker);
        const slideX =  daysDiff * slideWidth;
        // const slideX = (-slidesTraveled * slideWidth) + (slideIdx * slideWidth);

        // console.log("$$$$$ date", date);
        // console.log("$$$$$ slideIdx", slideIdx);
        // console.log("$$$$$ slidesTraveled", slidesTraveled);
        // console.log("$$$$$ slideWidth", slideWidth);
        // console.log("$$$$$ content", content);
        // console.log("$$$$$ calendarMarker", calendarMarker);
        //
        // if (slidesTraveled === 1) {
        //   debugger;
        // }
        return ({
          // flexShrink: 0,
          x: slideX + (SLIDER_MARGIN / 2),
          y: 8,
          width: slideWidth - (SLIDER_MARGIN / 2),
          height: "180px",
          backgroundColor: "rgba(255,255,255,0.5)",
          // backgroundColor: "rgba(0,0,0,0.15)",
          borderRadius: "2px",
          display: "grid",
          gridAutoFlow: "column",
        });
      case "MONTH":
        return ({});
      case "YEAR":
        return ({});
      default:
        return ({});
    }
  };

  /**
   * Effects
   */

  /**
   * =============== JSX ===============
   */
  const renderDay = () => {
    if (!content) {
      return null;
    }
    return content.map((hour, idx) => {
      const segmentDate = {
        ...date,
        HOUR: idx,
      };
      return (
        <Hour
          key={`day-${getDateFromMap(segmentDate)}`}
          date={segmentDate}
          content={hour}
          timePeriod={timePeriod}
          slideWidth={slideWidth}
        />
      );
    });
  };

  /**
   * Render Component
   */
  return (
    <motion.div
      style={getStyles()}
      className={className}
    >
      {date &&
      <div className={classNames.segmentLabel}>
        <Text style="label1">
          {format(getDateFromMap(date), DateFormatMap["DAY"])}
        </Text>
      </div>}
      {renderDay()}
    </motion.div>
  );
});

Day.displayName = "Day";

export { Day };
