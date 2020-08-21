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

  const { setCalendarIsOpen, setXDistance, isFullScreen, setIsFullScreen, isOpen } = useCalendar();

  const { windowHeight, windowWidth } = useWindowSize();

  const updatePanInfo = useCallback(throttle(_updatePanInfo, 250), [isFullScreen, isOpen]);

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

    // If y dips below the container, set it to 0
    if (oy < -50) {
      console.log("Cursor high");
      // console.log("Cursor below too low", py);
      // animate.set({
      //   y: 0,
      // });
      if (isOpen) {
        setIsFullScreen(true);
      }
      else {
        setCalendarIsOpen(true);
      }
    }

    if (oy > 30) {
      // console.log("Cursor below too high", py);
      // animate.set({
      //   y: 0,
      // });
      if (isFullScreen) {
        setIsFullScreen(false);
      }
      else {
        setCalendarIsOpen(false);
      }
    }

    if (Math.abs(ox) > 20) {
      setXDistance({
        distance: ox,
        velocity: vx,
      });
    }
  }

  return {
    updatePanInfo,
  };
}


export { useTimeline };
