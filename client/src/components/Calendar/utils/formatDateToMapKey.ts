// App
import { TimePeriod } from "@components/Calendar/common/types";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";

/**
 * Returns a date as DateMap key
 */
function formatDateToMapKey(
  scale: TimePeriod,
  date: Date,
) {
  const { YEAR, MONTH, DAY, HOUR, MINUTE } = getMapFromDate(date);

  switch (scale) {
    case "MINUTE":
      return `${YEAR}-${MONTH}-${DAY}-${HOUR}-${MINUTE}`;
    case "HOUR":
      return `${YEAR}-${MONTH}-${DAY}-${HOUR}`;
    case "DAY":
      return `${YEAR}-${MONTH}-${DAY}`;
    case "MONTH":
      return `${YEAR}-${MONTH}`;
    case "YEAR":
      return `${YEAR}`;
    default:
      return `${YEAR}`;
  }
}

export {formatDateToMapKey};
