// Libs
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

// Styles
import styles from "./styles.module.scss";

// Components
import { Text } from "@components/UI/Text";
import { Slider } from "@components/Calendar/Slider";

// Calendar
import { TCalendarProps } from "./types";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";
import classNames from "@components/Calendar/styles.module.scss";
import { useCalendar } from "@components/Calendar/store";

/**
 * Calendar
 */
const Calendar: FC<TCalendarProps> = ({eventsData}) => {

  const {
    isOpen,
    calendarMarker,
  } = useCalendar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className={classNames.calendarLabel}>
            <Text style="label2">
              {format(calendarMarker, "MMM dd")}
            </Text>
          </div>
          <motion.div
            className={styles.calendarContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 200, transition: { duration: 0.5 } }}
          >
            <Slider eventsData={eventsData}/>
          </motion.div>
          <motion.div
            className={styles.calendarMenuContainer}
            initial={{ opacity: 0 }}
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
