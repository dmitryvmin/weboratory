import { TimePeriod } from "@components/Calendar/common/types";
import { format } from "date-fns";
import { getDateAdjustedBy } from "@components/Calendar/utils/getDateAdjustedBy";

function formatDateRange(
  timePeriod: TimePeriod,
  date: Date,
  slideCount,
): string {

  const dateEnd = slideCount > 0
    ? getDateAdjustedBy(date, timePeriod, slideCount)
    : undefined;
  let dateString = "";

  switch (timePeriod) {
    case "MINUTE":
    case "HOUR":
      if (dateEnd) {
        const fromStart = format(date, "yyyy, MMM do,");
        const toStart = format(date, "yyyy, MMM do,");

        if (fromStart === toStart) {
          dateString += format(date, "yyyy, MMM do, eee h - ");
          dateString += format(dateEnd, "haaaa");
        }
        else {
          dateString += format(date, "yyyy, MMM do, eee h - ");
          dateString += format(dateEnd, "yyyy, MMM do, haaaa");
        }
      }
      else {
        dateString = format(date,  "yyyy, MMM do, eee haaaa");
      }
      break;
    case "DAY":
      if (dateEnd) {
        dateString += format(date, "yyyy, MMM d");
        dateString += format(dateEnd, " - do");
      }
      else {
        dateString = format(date,  "yyyy, MMM do");
      }
      break;
    case "MONTH":
      if (dateEnd) {
        dateString += format(date, "yyyy, MMM");
        dateString += format(dateEnd, " - MMM");
      }
      else {
        dateString = format(date,  "yyyy, MMM");
      }
      break;
    case "YEAR":
    default:
  }
  return dateString;
}

export { formatDateRange };
