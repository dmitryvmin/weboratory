/**
 * Return a Date from a json date object
 */
import { log } from "@dmitrymin/fe-log";
import { DateMap } from "@stores/CalendarStore/types";

function getDateFromMap({
  YEAR,
  MONTH,
  DAY,
  HOUR,
  MINUTE,
}: DateMap): Date {

  let dateString: string = "";

  if (YEAR) {
    dateString = `${YEAR}`;
    if (MONTH) {
      dateString += `-${MONTH}`;
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
debugger;
  return new Date(dateString);
}

export { getDateFromMap };