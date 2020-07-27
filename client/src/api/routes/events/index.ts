function getEventsByUserId(userId: string) {
  return `api/v1/events/${userId}`;
}

function getEventsByVisibility(visibility: string) {
  return `api/v1/events/vis/${visibility}`;
}

function updateEventContent(eventId: string) {
  return `api/v1/events/${eventId}`;
}

export {
  getEventsByUserId,
  updateEventContent,
  getEventsByVisibility,
}
