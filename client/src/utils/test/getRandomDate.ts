// Get a random date between the start and end dates
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export { getRandomDate };
