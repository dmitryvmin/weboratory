// Libs
import { getDaysInMonth } from "date-fns";

// App
import { TimePeriod } from "@components/Calendar/store/types";

/**
 * Returns [timeScale] segments
 */
function getSegmentsForTimeScale(
  timeScale: TimePeriod,
  start: Date,
): string[] {

  let segmentCount;

  switch (timeScale) {
    case "MINUTE":
      segmentCount = 60;
      break;
    case "HOUR":
      segmentCount = 60;
      break;
    case "DAY":
      segmentCount = 24;
      break;
    case "MONTH":
      segmentCount = getDaysInMonth(start);
      break;
    case "YEAR":
      segmentCount = 12;
      break;
    default:
      segmentCount = 1;
      break;
  }

  // Offset array by 1 so iteration begins on 1
  return [...Array(segmentCount).keys()]
    // Convert each number to a string
    .map((s) => s.toString())
    // Remove the leading 0
    .slice(1);
}

export { getSegmentsForTimeScale };
