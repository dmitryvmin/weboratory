// APp
import { Events } from "../../../db/models/objection/Events";

/**
 * Retrieves all event by visibility
 * @return post[]
 */
async function queryEventsByVisibility(visibility: string) {
  try {
    const events = await Events
      .query()
      .where("visibility", visibility);
    return events;
  }
  catch (err) {
    throw new Error(`Events service errored retrieving events with visibility of ${visibility}`);
  }
}

export { queryEventsByVisibility };
