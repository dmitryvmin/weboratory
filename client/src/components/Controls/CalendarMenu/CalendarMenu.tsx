// Libs
import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Utils
import { cn } from "@utils/css/getClassName";

// Components
import { ArrowDown, ArrowUp } from "@components/UI/Icon";
import { Text } from "@components/UI/Text";

// Store
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

// Styles
import classNames from "./styles.module.scss";
import { CalendarMenuProps } from "@components/Controls/CalendarMenu/types";

/**
 * Controls Calendar zoom
 */
const CalendarMenu: FC<CalendarMenuProps> = () => {

  /**
   * Hooks
   */
  const {
    isCalAtMaxPeriod,
    isCalAtMinPeriod,
    calPeriodZoomIn,
    calPeriodZoomOut,
  } = useCalendarStore();

  /**
   * Return JSX
   */
  return (
    <AnimatePresence>
      <motion.div
        className={classNames.calendarMenuContainer}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          // y: 0,
          transition: {
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 0,
          // y: 50,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <ArrowUp
          className={cn(
            classNames.zoomnBtn,
            isCalAtMaxPeriod && classNames.zoomnBtnDisabled,
          )}
          fontSize="40px"
          onClick={calPeriodZoomOut}
        />
        <ArrowDown
          className={cn(
            classNames.zoomnBtn,
            isCalAtMinPeriod && classNames.zoomnBtnDisabled,
          )}
          fontSize="40px"
          onClick={calPeriodZoomIn}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export { CalendarMenu };
