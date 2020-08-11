// Libs
import React, { FC } from "react";

// Components
import { ZoomIn, ZoomOut } from "@components/UI/Icon";
import { Text } from "@components/UI/Text";

// Store
import { useCalendar } from "@stores/CalendarStore";

// Styles
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { getDateFromMap } from "@components/Calendar/utils/getDateFromMap";

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
    calendarMarker,
  } = useCalendar();

  /**
   * Return JSX
   */
  return (
    <>
      <div className={styles.calendarLabel}>
        {/*{format(calendarMarker, "EEE, eo")}*/}
        <Text style="p3">{timeScale}</Text>
      </div>
      <ZoomOut
        className={[
          styles.zoomnBtn,
          isFirstPeriod() && styles.zoomnBtnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomOut}
      />
      <ZoomIn
        className={[
          styles.zoomnBtn,
          isLastPeriod() && styles.zoomnBtnDisabled,
        ].join(" ")}
        fontSize="40px"
        onClick={zoomIn}
      />
    </>
  );
};

export { CalendarMenu };
