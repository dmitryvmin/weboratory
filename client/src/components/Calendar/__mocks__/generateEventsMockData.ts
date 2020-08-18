// Libs
import { addMonths, addYears, subDays, subMonths, subYears } from "date-fns";

// App
import { getRandomHEX } from "@utils/test/getRandomHEX";
import { getRandomDate } from "@utils/test/getRandomDate";
import { getRandomString } from "@utils/test/getRandomString";
import { CalendarEvent } from "@components/Calendar/store/types";

// Generates an array of Date objects of length [num]
// that fall within the [start] - [end] timeframe
function generateEventsMockData(
  num = 500,
  start = subMonths(new Date(), 1),
  end = addMonths(new Date(), 1),
): CalendarEvent[] {

  // Used for storing mock event objects
  // const events: MockEventsData = {};
  const events: CalendarEvent[] = [];

  for (let i = 0; i < num; i++) {
    const time = getRandomDate(start, end);
    const title = getRandomString();
    const color = getRandomHEX();
    const event = {
      title,
      time,
      color,
    };

    events.push(event);
  }

  return events;
};

export { generateEventsMockData };
