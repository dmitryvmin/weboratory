// App
import { DateMap } from "@components/Calendar/common/types";

/**
 * Returns a Date from a dateMap object
 */
function getDateFromMap({
  YEAR,
  MONTH,
  DAY,
  HOUR,
  MINUTE,
}: Partial<DateMap>): Date {

  if (
    YEAR !== undefined &&
    MONTH !== undefined &&
    DAY !== undefined &&
    HOUR !== undefined &&
    MINUTE !== undefined
  ) {
    return new Date(YEAR, MONTH, DAY, HOUR, MINUTE);
  }

  if (
    YEAR !== undefined &&
    MONTH !== undefined &&
    DAY !== undefined &&
    HOUR !== undefined
  ) {
    return new Date(YEAR, MONTH, DAY, HOUR);
  }

  if (
    YEAR !== undefined &&
    MONTH !== undefined &&
    DAY !== undefined
  ) {
    return new Date(YEAR, MONTH, DAY);
  }

  if (
    YEAR !== undefined &&
    MONTH !== undefined
  ) {
    return new Date(YEAR, MONTH);
  }

  if (YEAR !== undefined) {
    return new Date(YEAR, 0, 1);
  }

  console.warn("check getDateFromMap");
  return new Date();
}

export { getDateFromMap };