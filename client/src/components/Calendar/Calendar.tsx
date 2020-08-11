// Libs
import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utils
import { createMockData } from "@components/Calendar/__tests__/utils";

// Styles
import styles from "./styles.module.scss";

// Components
import { Slider } from "@components/Calendar/Slider";
import { useCalendar } from "@stores/CalendarStore";

// Types
import { TCalendarProps } from "./types";
import { CalendarMenu } from "@components/Calendar/CalendarMenu";
import classNames from "@components/Calendar/styles.module.scss";
import { Text } from "@components/UI/Text";
import { format } from "date-fns";

/**
 * Calendar
 */
const Calendar: FC<TCalendarProps> = ({data}) => {

  const { isOpen, calendarMarker } = useCalendar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/*<div className={classNames.calendarLabel}>*/}
          {/*  <Text style="label2">*/}
          {/*    {format(calendarMarker, "EEE, eo")}*/}
          {/*  </Text>*/}
          {/*</div>*/}
          <motion.div
            className={styles.calendarContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 200, transition: { duration: 0.5 } }}
          >
            <Slider data={data}/>
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
