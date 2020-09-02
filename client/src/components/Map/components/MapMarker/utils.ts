// Libs
import { isWithinInterval } from "date-fns";

// App
import { SegmentType } from "@stores/globalStore/stores/calendar/types";

export function checkIsMarkerHovered(
  time: Date,
  hoveredSegment: SegmentType,
) {
  let isActive = false;

  if (time && hoveredSegment) {
    isActive = isWithinInterval(
      time,
      {
        start: hoveredSegment.startDate,
        end: hoveredSegment.endDate,
      },
    );
  }

  return isActive;
}
