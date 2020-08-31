// Libs
import React from "react";

// Components
import { Text } from "@components/UI/Text";

// Styles
import classNames from "./styles.module.scss";

// Utils
import { formatDateRange } from "@components/Calendar/utils/formatDateRange";

// Hooks
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";

/**
 * Controls Calendar zoom
 */
export const DateLabel = () => {

  /**
   * Hooks
   */
  const {
    calCurrentDate,
    calTimePeriod,
    slideCount,
  } = useCalendarStore();

  /**
   * JSX
   */
  return (
    <div className={classNames.calendarDateLabel}>
      <Text style="label1">
        {formatDateRange(calTimePeriod, calCurrentDate, slideCount - 1)}
      </Text>
    </div>
  );
};
