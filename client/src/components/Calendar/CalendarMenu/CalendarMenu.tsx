// Libs
import React, { FC } from "react";

// Components
import { ZoomIn, ZoomOut } from "@components/UI/Icon";
import { Text } from "@components/UI/Text";

// Store
import { useCalendar } from "@stores/CalendarStore";

// Styles
import styles from "./styles.module.scss";

/**
 * Controls Calendar zoom
 */
const CalendarMenu: FC<{}> = ({}) => {

  /**
   * Hooks
   */
  const {
    zoomIn,
    zoomOut,
    timeScale,
    isFirstPeriod,
    isLastPeriod,
  } = useCalendar();

  /**
   * Return JSX
   */
  return (
    <>
      <div className={styles.period}>
        <Text style="p3">{timeScale}</Text>
      </div>
      <ZoomOut
        className={[
          styles.btn,
          isFirstPeriod() && styles.btnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomOut}
      />
      <ZoomIn
        className={[
          styles.btn,
          isLastPeriod() && styles.btnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomIn}
      />
    </>
  );
};

export { CalendarMenu };
