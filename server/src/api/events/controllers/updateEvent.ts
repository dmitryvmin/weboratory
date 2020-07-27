// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { updateEventContent } from "../services/updateEventContent";

/**
 * Updates an event by event_id
 *
 * @return event
 */
async function updateEvent(ctx: Context, next: () => Promise<any>) {

  // Get the event_id value from the request
  const { eventId } = ctx.params;

  // Get the request payload
  if (!ctx.request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  const {
    content,
    status,
    title,
    location,
    time,
    coordinates,
  } = ctx.request.body;

  try {
    const event = await updateEventContent(eventId, ctx.request.body);
    ctx.status = HttpStatus.OK;
    ctx.body = event;
    await next();
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Couldn't update eventId ${eventId}`;
    await next();
  }
}

export { updateEvent };
