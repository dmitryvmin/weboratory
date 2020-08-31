// Libs
import React, { FC, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Styles
import classNames from "./styles.module.scss";

// Components
import { Slider } from "@components/Calendar/Slider";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";

// Hooks
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

// Types
import { CalendarPropType } from "@components/Calendar/types";
import { DateLabel } from "@components/Calendar/DateLabel";
import { TimePeriodLabel } from "./TimePeriodLabel";

/**
 * Calendar
 */
const Calendar: FC<CalendarPropType> = () => {

  /**
   * Hooks
   */
  const {
    calMode,
  } = useCalendarStore();

  const controls = useAnimation();

  const { windowHeight } = useWindowSize();

  const sliderContainerVariants = {
    "DOCKED": {
      opacity: 1,
      y: -300,
      height: 200,
      transition: {
        duration: 0.5,
      },
    },
    "FULLSCREEN": {
      y: -windowHeight + 100,
      height: windowHeight - 200,
      transition: {
        duration: 0.5,
      },
    },
    "CLOSED": {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    controls.start(sliderContainerVariants[calMode]);
  }, [
    calMode,
  ]);

  /**
   * JSX
   */
  return (
    <AnimatePresence>
      {(calMode !== "CLOSED") && (
        <>
          <motion.div
            className={classNames.calendarContainer}
            animate={controls}
            initial="CLOSED"
            exit="CLOSED"
            variants={sliderContainerVariants}
          >
            <DateLabel/>
            <div className={classNames.sliderContainer}>
              <Slider/>
            </div>
          </motion.div>
          <motion.div
            className={classNames.calendarMenuContainer}
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
            }}
          >
            <CalendarMenu/>
          </motion.div>
          <TimePeriodLabel/>
        </>
      )}
    </AnimatePresence>
  );
};

export { Calendar };
