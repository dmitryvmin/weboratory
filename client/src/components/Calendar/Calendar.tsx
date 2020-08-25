// Libs
import React, { FC, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { format } from "date-fns";

// Styles
import classNames from "./styles.module.scss";

// Components
import { Text } from "@components/UI/Text";
import { Slider } from "@components/Calendar/Slider";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { formatDateRange } from "@components/Calendar/utils/formatDateRange";

// Utils
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";

// Calendar
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { TCalendarProps } from "./types";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";
import { CurrentDate } from "@components/Calendar/CurrentDate";

// Constants
// import { CurrentDateFormatMap } from "./constants";

/**
 * Calendar
 */
const Calendar: FC<TCalendarProps> = () => {

  /**
   * Hooks
   */
  const {
    isCalendarOpen,
    isFullScreen,
    currentDate,
    timePeriod,
    slideCount,
  } = useCalendar();

  const controls = useAnimation();

  const { windowHeight } = useWindowSize();

  const sliderContainerVariants = {
    docked: {
      opacity: 1,
      y: -300,
      height: 200,
      transition: {
        duration: 0.5,
      },
    },
    fullScreen: {
      y: -windowHeight + 100,
      height: windowHeight - 200,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {

    const getCalendarVariant = () => {
      let variant;
      if (isFullScreen) {
        variant = "fullScreen";
      }
      else {
        if (isCalendarOpen) {
          variant = "docked";
        }
        else {
          variant = "exit";
        }
      }
      return variant;
    };

    const variant = getCalendarVariant();
    controls.start(sliderContainerVariants[variant]);

  }, [
    isFullScreen,
    isCalendarOpen,
  ]);

  /**
   * JSX
   */
  return (
    <AnimatePresence>
      {(isCalendarOpen || isFullScreen) && (
        <>
          <motion.div
            className={classNames.calendarContainer}
            animate={controls}
            initial="exit"
            exit="exit"
            variants={sliderContainerVariants}
          >
            <div className={classNames.calendarDateLabel}>
              <Text style="label1">
                {formatDateRange(timePeriod, currentDate, slideCount)}
              </Text>
            </div>
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
            }}
          >
            <CurrentDate/>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Calendar };
