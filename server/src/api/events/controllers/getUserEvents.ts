// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { getAllEventsByUserId } from "../services/getEventsByUserId";

/**
 * Fetch all events matching user_id
 */
async function getUserEvents(ctx: Context, next: () => Promise<any>) {

  // Get the user_id value from the request
  const { userId } = ctx.params;

  try {
    const events = await getAllEventsByUserId(userId);
    ctx.status = HttpStatus.OK;
    ctx.body = events;
    await next();
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Couldn't retrieve events for userId ${userId}`;
    await next();
  }
}

export { getUserEvents };
