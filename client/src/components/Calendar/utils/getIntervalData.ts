// Libs
import { isWithinInterval } from "date-fns";
import invariant from "invariant";
import { CalendarEvent } from "@components/Calendar/store/types";

// App

/**
 * Returns event data that falls within the [start] - [end] range
 */
function getIntervalData(
  data: CalendarEvent[],
  start: Date,
  end: Date,
) {

  invariant(data, "Couldn't get slide data. The [data] object is falsy:", data);
  invariant(start, "Couldn't get slide data. The interval [start] is falsy:", start);
  invariant(end, "Couldn't get slide data. The interval [end] is falsy:", end);

  const intervalDate = data.filter((date) => {
    return isWithinInterval(date.time, { start, end });
  });

  return intervalDate;
}

export {getIntervalData};
