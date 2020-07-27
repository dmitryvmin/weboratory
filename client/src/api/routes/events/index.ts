function getEventsByUserId(userId: string) {
  return `api/v1/events/${userId}`;
}

function updateEventContent(eventId: string) {
  return `api/v1/events/${eventId}`;
}

function updateEventsByVisibility(visibility: string) {
  return `api/v1/events/vis/${visibility}`;
}

export {
  getEventsByUserId,
  updateEventContent,
}
