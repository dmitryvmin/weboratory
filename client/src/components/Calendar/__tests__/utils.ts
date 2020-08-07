import subDays from "date-fns/subDays";

// Get a random date between the start and end dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Make a range one week back to one week forward
const rangeStart = subDays(new Date(), -14);
const rangeEnd = subDays(new Date(), 14);

// Generates an array of Date objects of length [num]
// that fall within the [start] - [end] timeframe
function createMockData(
  num = 500,
  start = rangeStart,
  end = rangeEnd,
) {
  const dates: Date[] = [];
  for (let i = 0; i < num; i++) {
    const date = getRandomDate(start, end);
    dates.push(date);
  }
  return dates;
};

export {
  createMockData,
  getRandomDate,
};
