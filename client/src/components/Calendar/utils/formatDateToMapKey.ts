import { TimePeriod } from "@stores/CalendarStore/types";
import { getMapFromDate } from "@components/Calendar/utils/getMapFromDate";

function formatDateToMapKey(
  scale: TimePeriod,
  date: Date,
) {
  const { YEAR, MONTH, DAY, HOUR, MINUTE } = getMapFromDate(date);

  switch (scale) {
    case "MINUTE":
      return `${YEAR}-${MONTH}-${DAY}-${HOUR}-${MINUTE}`;
    case "HOUR":
      return `${YEAR}-${MONTH}-${DAY}-${HOUR}-${MINUTE}`;
    case "DAY":
      return `${YEAR}-${MONTH}-${DAY}-${HOUR}`;
    case "MONTH":
      return `${YEAR}-${MONTH}-${DAY}`;
    case "YEAR":
      return `${YEAR}-${MONTH}`;
    default:
      return `${YEAR}`;
  }
}

export {formatDateToMapKey};
