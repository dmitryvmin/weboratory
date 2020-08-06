// Libs
import { addDays, addHours, addMinutes, addWeeks, addYears, isWithinInterval } from "date-fns";
import invariant from "invariant";

// App
import { log } from "@utils/Logger";

function getTimeMarker(timeMarker, timeScale, offset = 1) {
  if (!timeMarker) {
    log("Couldn't get nextTimeIndex, timeMarker value is falsy", timeMarker);
    return;
  }
  if (!timeScale) {
    log("Couldn't get nextTimeIndex, timeScale value is falsy", timeScale);
    return;
  }

  switch (timeScale) {
    case "MINUTE":
      return addMinutes(timeMarker, offset);
    case "HOUR":
      return addHours(timeMarker, offset);
    case "DAY":
      return addDays(timeMarker, offset);
    case "WEEK":
      return addWeeks(timeMarker, offset);
    case "MONTH":
      return addHours(timeMarker, offset);
    case "YEAR":
      return addYears(timeMarker, offset);
    case "ALL":
      return;
  }
}

function getSlideData(data, start, end) {
  invariant(data, "Couldn't get slide data. The [data] object is falsy.");
  invariant(start, "Couldn't get slide data. The interval [start] is falsy");
  invariant(end, "Couldn't get slide data. The interval [end] is falsy");

  return data.filter((date) => isWithinInterval(date, { start, end }));
}

function getCurrentTimeMarker(timeScale) {

  const currentTime = new Date();

  return({
    idx: 0,
    start: currentTime,
    end: getTimeMarker(currentTime, timeScale, 1),
  })
}

export {
  getCurrentTimeMarker,
  getTimeMarker,
  getSlideData,
};
