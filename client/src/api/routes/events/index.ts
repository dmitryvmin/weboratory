function getEventsByUserId(userId: string) {
  return `api/v1/events/${userId}`;
}

export {
  getEventsByUserId,
}
