import { Events } from "../../../models/objection/Events";

/**
 * Updates event content
 * @return event
 */
async function queryUpdateEvent(
  eventId: string,
  {
    userId,
    associatedIds,
    content,
    status,
    title,
    address,
    time,
    coordinates,
    visibility,
    createdAt,
  },
) {
  try {

    const eventContent = {
      ...(userId && { userId }),
      ...(associatedIds && { associatedIds }),
      ...(content && { content }),
      ...(status && { status }),
      ...(title && { title }),
      ...(address && { address }),
      ...(time && { time }),
      ...(coordinates && { coordinates }),
      ...(visibility && { visibility }),
      ...(createdAt && { createdAt }),
      updatedAt: new Date().toISOString(),
    };

    const event = await Events
      .query()
      .update(eventContent)
      .where("eventId", eventId)
      .first();

    return event;
  }
  catch (err) {
    console.log("Events service errored updating event_id:", eventId);
  }
}

export { queryUpdateEvent };
