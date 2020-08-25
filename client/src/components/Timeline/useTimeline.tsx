// Libs
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import { PanInfo } from "framer-motion";

// Hooks
import { useWindowSize } from "@utils/hooks/useWindowSize";
import { useCalendar } from "@components/Calendar/hooks/useCalendar";
import { log } from "@dmitrymin/fe-log";

function useTimeline() {

  /**
   * =============== Hooks ===============
   */
    // const [panInfo, setPanInfo] = useState<PanInfo>();

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { setCalendarIsOpen, setXDistance, isFullScreen, isCalendarOpen, toggleCalendar } = useCalendar();

  const { windowHeight, windowWidth } = useWindowSize();

  const updatePanInfo = useCallback(throttle(_updatePanInfo, 500), [isFullScreen, isCalendarOpen]);

  function _updatePanInfo(info: PanInfo) {

    const {
      point: {
        x: px,
        y: py,
      },
      offset: {
        x: ox,
        y: oy,
      },
      velocity: {
        x: vx,
        y: vy,
      },
    } = info;

    if (oy < -50) {
      console.log("Cursor UP");
      toggleCalendar(true);
    }

    if (oy > 30) {
      console.log("Cursor DOWN", oy);
      toggleCalendar(false);
    }

    if (Math.abs(ox) > 20) {
      const absX = Math.abs(ox);
      let speed = 1;
      if (absX > 50 && absX < 100) {
        speed = 1.5;
      }
      if (absX > 100) {
        speed = 2;
      }
      console.log(`Cursor ${ox < 0 ? "LEFT" : "RIGHT"}`, absX);
      setXDistance({
        distance: ox * speed,
        duration: 500,
        velocity: vx,
      });
    }
  }

  return ({
    updatePanInfo,
  });
}


export { useTimeline };
