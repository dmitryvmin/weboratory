// Libs
import React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Components
import {Text} from "@components/UI/Text";

// Hooks
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

// Styles
import classNames from "./styles.module.scss";

/**
 * Controls Calendar zoom
 */
export const TimePeriodLabel = () => {

  /**
   * Hooks
   */
  const {
    calTimePeriod,
    calCurrentDate,
  } = useCalendarStore();

  /**
   * Return JSX
   */
  return (
    <motion.div
      className={classNames.calendarTimePeriod}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: 0,
        y: 50,
        transition: {
          duration: 0.5,
        },
      }}>
      <>
        <Text
          className={classNames.calendarLabel}
          style="label1"
        >
          {/*{format(currentDate, CurrentDateFormatMap[timePeriod])}*/}
          <span className={classNames.timePeriod}>
          {`${calTimePeriod.toLowerCase()}`}
        </span>
        </Text>
      </>
    </motion.div>
  );
};
