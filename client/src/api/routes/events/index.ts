function getEventsByUserId(userId: string) {
  return `api/v1/events/${userId}`;
}

function updateEventContent(eventId: string) {
  return `api/v1/events/${eventId}`;
}

export {
  getEventsByUserId,
  updateEventContent,
}
