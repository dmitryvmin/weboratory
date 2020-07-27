// Libs
import React, { FC } from "react";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";

// Components
import { useCalendar } from "@components/Calendar/store/useCalendar";

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
    period,
    isFirstPeriod,
    isLastPeriod,
  } = useCalendar();

  /**
   * Return JSX
   */
  return (
    <>
      <IosRemoveCircleOutline
        className={[styles.btn, isFirstPeriod() && styles.btnDisabled].join(" ")}
        fontSize="40px"
        onClick={zoomOut}
      />
      <IosAddCircleOutline
        className={[styles.btn, isLastPeriod() && styles.btnDisabled].join(" ")}
        fontSize="40px"
        onClick={zoomIn}
      />
      <div className={styles.period}>{period}</div>
    </>
  );
};

export { CalendarMenu };
