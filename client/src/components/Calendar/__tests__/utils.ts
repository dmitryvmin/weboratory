import subDays from "date-fns/subDays";
import { getRandomHEX } from "@utils/getRandomHEX";
import { CalendarEvent } from "@components/Calendar/types";

// Get a random date between the start and end dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Make a range one week back to one week forward
const rangeStart = subDays(new Date(), -14);
const rangeEnd = subDays(new Date(), 14);

function getRandomString(length: number = 15) {
  return [...Array(10)]
    .map(i => (~~(Math.random() * 36)).toString(36))
    .join("");
}

// Generates an array of Date objects of length [num]
// that fall within the [start] - [end] timeframe
function createMockData(
  num = 500,
  start = rangeStart,
  end = rangeEnd,
): CalendarEvent[] {

  // Used for storing mock event objects
  const events: CalendarEvent[] = [];

  for (let i = 0; i < num; i++) {
    const time = getRandomDate(start, end);
    const title = getRandomString();
    const color = getRandomHEX();
    events.push({
      title,
      time,
      color,
    });
  }

  return events;
};

export {
  createMockData,
  getRandomDate,
};
