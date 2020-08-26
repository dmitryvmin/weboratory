// Libs
import { addMonths, addYears, subMonths, subYears } from "date-fns";
import randomLocation from "random-location";

// Utils
import { getRandomHEX } from "@utils/test/getRandomHEX";
import { getRandomDate } from "@utils/test/getRandomDate";
import { getRandomString } from "@utils/test/getRandomString";
import { getToday } from "@components/Calendar/utils/getToday";

// Types
import { CalendarEvent } from "@components/Calendar/common/types";

// Generates an array of Date objects of length [num]
// that fall within the [start] - [end] timeframe
function generateEventsMockData(
  num = 1000,
  start = addMonths(getToday(), -8),
  end = addMonths(getToday(), 8),
): CalendarEvent[] {

  // Used for storing mock event objects
  // const events: MockEventsData = {};
  const events: CalendarEvent[] = [];

  for (let i = 0; i < num; i++) {
    const time = getRandomDate(start, end);
    const title = getRandomString();
    const color = getRandomHEX();
    const {latitude, longitude} = randomLocation.randomCirclePoint({
      latitude: 47.620422,
      longitude: -122.349358,
    }, 1000);

    events.push({
      title,
      time,
      color,
      coordinates: { lat: latitude, lng: longitude },
    });
  }

  return events;
}

export { generateEventsMockData };
