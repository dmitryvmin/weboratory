import { Events } from "../../../db/models/objection/Events";

/**
 * Creates a new Event
 * @param body
 *
 * @return event
 */
async function queryCreateEvent({
  user_id,
  content,
  status,
  title,
  location,
  time,
  coordinates,
  visibility,
}) {
  const event = await Events
    .query()
    .insert({
      user_id,
      content,
      status,
      title,
      location,
      time,
      coordinates,
      visibility,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  return event;
}

export {queryCreateEvent};
