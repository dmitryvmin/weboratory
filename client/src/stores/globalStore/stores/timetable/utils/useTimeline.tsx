// Libs
import React, { useCallback } from "react";
import throttle from "lodash.throttle";
import { PanInfo } from "framer-motion";

// Store
import { useCalendarStore } from "@stores/globalStore/stores/calendar/useCalendarStore";
import { useSliderStore } from "@stores/globalStore/stores/slider/useSliderStore";

/**
 * useTimeline
 */
function useTimeline() {

  /**
   * =============== Hooks ===============
   */
  const {
    calMode,
    setCalOpen,
    setCalClosed,
  } = useCalendarStore();

  const { setSliderXDistance } = useSliderStore();

  const updatePanInfo = useCallback(throttle(_updatePanInfo, 500), [calMode]);

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
      setCalOpen();
    }

    if (oy > 30) {
      console.log("Cursor DOWN", oy);
      setCalClosed();
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
      setSliderXDistance({
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
