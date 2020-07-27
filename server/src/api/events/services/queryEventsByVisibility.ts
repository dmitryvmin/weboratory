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
    console.log("Events service errored retrieving events with visibility of ", visibility);
    throw err;
  }
}

export { queryEventsByVisibility };
