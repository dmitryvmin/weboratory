// Libs
import invariant from "invariant";

// App
import { TimeMarker } from "@stores/CalendarStore/types";

/**
 * Returns an assembled TimeMarker object
 */
function getTimeMarker({
    start,
    end,
    x,
  }: {
    start: Date,
    end: Date,
    x: number,
  },
): TimeMarker {

  invariant(start, "Couldn't create a TimeMarker because the startTime is falsy:", start);
  invariant(end, "Couldn't create a TimeMarker because the startTime is falsy:", end);

  return {
    start,
    end,
    x,
  };
}

export { getTimeMarker };
