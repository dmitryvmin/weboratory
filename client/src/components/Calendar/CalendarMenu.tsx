// Libs
import React, { FC } from "react";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";

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
      <IosRemoveCircleOutline
        className={[
          styles.btn,
          isFirstPeriod() && styles.btnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomOut}
      />
      <IosAddCircleOutline
        className={[
          styles.btn,
          isLastPeriod() && styles.btnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomIn}
      />
      <div className={styles.period}>
        {timeScale}
      </div>
    </>
  );
};

export { CalendarMenu };
