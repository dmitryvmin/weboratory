import subDays from "date-fns/subDays";

const randomDate = (start, end) => {
  let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};

// Make a range one week back to one week forward
const rangeStart = subDays(new Date(), -14);
const rangeEnd = subDays(new Date(), 14);

export const createMockData = (num = 50) => {
  const dates: string[] = [];
  for (let i = 0; i < num; i++) {
    const date = randomDate(rangeStart, rangeEnd);
    dates.push(date);
  }
  return dates;
};
