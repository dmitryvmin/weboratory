import { startOfToday } from "date-fns";

/**
 * Returns today's start date
 */
function getToday() {
  return startOfToday();
}

export { getToday };