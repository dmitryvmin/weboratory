// Libs
import React from "react";

// Components
import { Text } from "@components/UI/Text";

// Styles
import classNames from "./styles.module.scss";

// Utils
import { formatDateRange } from "@utils/date/formatDateRange";

// Hooks
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";
import { useSliderStore } from "@stores/globalStore/stores/slider/useSliderStore";

/**
 * Controls Calendar zoom
 */
export const TimelineDateLabel = () => {

  /**
   * Hooks
   */
  const {
    calCurrentDate,
    calTimePeriod,
  } = useCalendarStore();

  const {slideCount} = useSliderStore();

  /**
   * JSX
   */
  return (
    <div className={classNames.timelineDateLabel}>
      <Text style="label1">
        {formatDateRange(calTimePeriod, calCurrentDate, slideCount - 1)}
      </Text>
    </div>
  );
};
