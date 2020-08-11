/**
 * Return a Date from a json date object
 */
function getDateFromMap({
  year,
  month,
  day,
  hour,
  minute,
}: {
  year: number,
  month: number,
  day?: number,
  hour?: number,
  minute?: number,
}): Date {

  let dateString: string = "";

  if (year) {
    dateString = `${year}`;
    if (month) {
      dateString += `-${month}`;
      if (day) {
        dateString += `-${day}`;
        if (hour) {
          dateString += ` ${hour}:`;
          if (minute) {
            dateString += `${minute}`
          }
        }
      }
    }
  }

  return new Date(dateString);
}

export { getDateFromMap };