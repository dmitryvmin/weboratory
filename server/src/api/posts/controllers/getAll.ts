// Lib
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { getAllPosts } from "../services";

/**
 * Get all existing Post rows
 *
 * @return new Post[]
 */
async function getAll(ctx: Context, next: () => Promise<any>) {
  try {
    const posts = await getAllPosts();
    ctx.status = HttpStatus.OK;
    ctx.body = posts;
    await next();
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = "Couldn't retrieve all Posts.";
  }
}

export {getAll};
