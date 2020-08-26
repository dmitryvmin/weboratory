// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { queryCreateEvent } from "../services/queryCreateEvent";

/**
 * Creates a new event
 */
async function createEvent(ctx: Context, next: () => Promise<any>) {

  if (!ctx.request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  try {
    const event = await queryCreateEvent(ctx.request.body);
    ctx.status = HttpStatus.CREATED;
    ctx.body = event;
    await next();
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = "Couldn't create new event." + err;
    await next();
  }
}

export { createEvent };
