// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { updatePostByPostId } from "../services";

/**
 * Updates Post title and content columns in the Post table
 * @param ctx.request.body title and content
 *
 * @return new Post
 */
async function updateOne(ctx: Context, next: () => Promise<any>) {

  // Get the request payload
  if (!ctx.request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  const {
    title,
    content,
    id,
  } = ctx.request.body;

  if (!title && !content) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "No title or content provided in the Post update.";
    return;
  }

  // Update Posts table
  try {
    const post = await updatePostByPostId(id, { title, content });
    ctx.status = HttpStatus.OK;
    ctx.body = `Post with id ${JSON.stringify(post)} updated successfully.`;
  }
  catch (err) {
    ctx.status = HttpStatus.BAD_REQUEST;
    ctx.body = `Error updating post with id: ${id}`;
  }
}

export {updateOne};