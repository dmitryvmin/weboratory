// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { queryEventsByVisibility } from "../services/queryEventsByVisibility";

/**
 * Fetch all events matching user_id
 */
async function getAllEventsByVisibility(ctx: Context, next: () => Promise<any>) {

  // Get the user_id value from the request
  const { visibility } = ctx.params;

  try {
    const events = await queryEventsByVisibility ?? [];
    ctx.status = HttpStatus.OK;
    ctx.body = events;
    await next();
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Couldn't retrieve events with visibility of ${visibility}. Error: ${err}`;
    await next();
  }
}

export { getAllEventsByVisibility };
