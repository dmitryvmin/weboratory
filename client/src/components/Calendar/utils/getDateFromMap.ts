/**
 * Return a Date from a json date object
 */
import { log } from "@dmitrymin/fe-log";
import { DateMap } from "@components/Calendar/store/types";

function getDateFromMap({
  YEAR,
  MONTH,
  DAY,
  HOUR,
  MINUTE,
}: Partial<DateMap>): Date {

  let dateString: string = "";

  if (YEAR) {
    dateString = `${YEAR}`;
    if (MONTH) {
      dateString += `-${MONTH + 1}`;
      if (DAY) {
        dateString += `-${DAY}`;
        if (HOUR) {
          dateString += ` ${HOUR}:`;
          if (MINUTE) {
            dateString += `${MINUTE}`
          }
        }
      }
    }
  }

  return new Date(dateString);
}

export { getDateFromMap };