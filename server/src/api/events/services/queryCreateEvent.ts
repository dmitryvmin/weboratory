import { Events } from "../../../models/objection/Events";

/**
 * Creates a new Event
 * @param body
 *
 * @return event
 */
async function queryCreateEvent({
  userId,
  content,
  status,
  title,
  address,
  time,
  coordinates,
  visibility,
}) {
  const event = await Events
    .query()
    .insert({
      userId,
      content,
      status,
      title,
      address,
      time,
      coordinates,
      visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

  return event;
}

export {queryCreateEvent};
