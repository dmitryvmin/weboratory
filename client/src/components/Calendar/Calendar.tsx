// Libs
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils
import { createMockData } from "@components/Calendar/__tests__/utils";

// Styles
import styles from "./styles.module.scss";

// Components
import { Slider } from "@components/Calendar/Slider";
import { useCalendar } from "@components/Calendar/store/useCalendar";

// Types
import { TCalendarProps } from "./types";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";

const mockData = createMockData();

/**
 * Calendar
 */
const Calendar: FC<TCalendarProps> = () => {

  const { isOpen } = useCalendar();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            className={styles.calendarContainer}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 200, transition: { duration: 0.5 } }}
          >
            <Slider/>
          </motion.div>
          <motion.div
            className={styles.calendarMenuContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
          >
            <CalendarMenu/>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Calendar };
