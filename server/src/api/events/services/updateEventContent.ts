import { Events } from "../../../db/models/objection/Events";

/**
 * Updates event content
 * @return event
 */
async function updateEventContent(
  eventId: string,
  {
    content,
    status,
    title,
    location,
    time,
    coordinates,
  },
) {
  try {
    const eventContent = {
      ...(content && { content }),
      ...(status && { status }),
      ...(title && { title }),
      ...(location && { location }),
      ...(time && { time }),
      ...(coordinates && { coordinates }),
      updated_at: new Date().toISOString(),
    };

    const event = await Events
      .query()
      .update(eventContent)
      .where("event_id", eventId);

    return event;
  }
  catch (err) {
    console.log("Events service errored updating event_id:", eventId);

  }
}

export { updateEventContent };
