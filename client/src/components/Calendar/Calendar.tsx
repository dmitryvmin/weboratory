// Libs
import React, { FC, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Styles
import classNames from "./styles.module.scss";

// Components
import { Slider } from "@components/Calendar/Slider";

// Calendar
import { TCalendarProps } from "./types";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { CurrentDate } from "@components/Calendar/CurrentDate";
import { useWindowSize } from "@utils/hooks/useWindowSize";

/**
 * Calendar
 */
const Calendar: FC<TCalendarProps> = () => {

  /**
   * Hooks
   */
  const { isOpen, isFullScreen } = useCalendar();

  const controls = useAnimation();

  const { windowHeight } = useWindowSize();

  const sliderContainerVariants = {
    docked: {
      opacity: 1,
      y: 0,
      height: 200,
      transition: {
        duration: 0.5,
      },
    },
    fullScreen: {
      y: 0,
      height: windowHeight - 120,
      transition: {
        duration: 0.5,
      },
    },
    // closed: {
    //   opacity: 0,
    //   y: 200,
    //   transition: {
    //     duration: 0.5,
    //   },
    // },
    exit: {
      opacity: 0,
      y: 50,
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
        if (isOpen) {
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
    isOpen,
  ]);

  /**
   * JSX
   */
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={classNames.calendarContainer}
            animate={controls}
            initial="exit"
            exit="exit"
            variants={sliderContainerVariants}
          >
            <Slider/>
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
            className={classNames.calendarDateContainer}
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
