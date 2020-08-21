// Libs
import React, { FC } from "react";

// Utils
import { cn } from "@utils/css/getClassName";

// Components
import { ZoomIn, ZoomOut } from "@components/UI/Icon";
import { Text } from "@components/UI/Text";
import { CalendarMenuProps } from "@components/Calendar/CalendarMenu/types";

// Hooks
import { useCalendar } from "@components/Calendar/hooks/useCalendar/useCalendar";

// Styles
import styles from "./styles.module.scss";

/**
 * Controls Calendar zoom
 */
const CalendarMenu: FC<CalendarMenuProps> = () => {

  /**
   * Hooks
   */
  const {
    zoomIn,
    zoomOut,
    isAtMaxPeriod,
    isAtMinPeriod,
  } = useCalendar();

  /**
   * Return JSX
   */
  return (
    <>
      <ZoomOut
        className={cn(
          styles.zoomnBtn,
          isAtMaxPeriod() && styles.zoomnBtnDisabled,
        )}
        fontSize="40px"
        onClick={zoomOut}
      />
      <ZoomIn
        className={cn(
          styles.zoomnBtn,
          isAtMinPeriod() && styles.zoomnBtnDisabled,
        )}
        fontSize="40px"
        onClick={zoomIn}
      />
    </>
  );
};

export { CalendarMenu };
