import { Events } from "../../../models/objection/Events";

/**
 * Retrieves all event rows for requested userId
 * @return post[]
 */
async function getAllEventsByUserId(userId: string) {
  try {
    const events = await Events
      .query()
      .where("user_id", userId);

    return events;
  }
  catch (err) {
    console.log("Events service errored retrieving events for userId:", userId);
    throw err;
  }
}

export { getAllEventsByUserId };
