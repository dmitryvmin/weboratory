// Libs
import React from "react";
import { format } from "date-fns";

// Components
import { ZoomIn, ZoomOut } from "@components/UI/Icon";
import { Text } from "@components/UI/Text";
import { CalendarMenuProps } from "@components/Calendar/CalendarMenu/types";

// Hooks
import { useCalendar } from "@components/Calendar/hooks/useCalendar/useCalendar";

// Styles
import styles from "./styles.module.scss";

// Constants
import { CurrentDateFormatMap } from "@components/Calendar/constants";

/**
 * Controls Calendar zoom
 */
const CurrentDate = () => {

  /**
   * Hooks
   */
  const {
    timePeriod,
    currentDate,
  } = useCalendar();

  /**
   * Return JSX
   */
  return (
    <div>
      <Text
        className={styles.calendarLabel}
        style="label1"
      >
        {/*{format(currentDate, CurrentDateFormatMap[timePeriod])}*/}
        <span className={styles.timePeriod}>
          {`${timePeriod.toLowerCase()}s`}
        </span>
      </Text>
    </div>
  );
};

export { CurrentDate };
