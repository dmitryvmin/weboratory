// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { getPostByPostTitle } from "../services";

/**
 * Retrieves a Post by Title

 * @method GET
 * @path /api/posts/:postTitle
 * @header Authorization: String
 *
 * @returns
 * 200 Found
 * 404 Not Found
 * 406 Not Acceptable
 */
async function getOne(ctx: Context, next: () => Promise<any>) {

  // Get the postTitle value from the request
  const { postTitle } = ctx.params;

  // Make sure postId value exists.
  if (!postTitle) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Post Title is missing.";
    return;
  }

  // Add entry to the Posts table
  try {
    const post = await getPostByPostTitle(postTitle);
    ctx.status = HttpStatus.OK;
    ctx.body = post;
  }
  catch (err) {
    ctx.status = HttpStatus.NOT_FOUND;
    ctx.body = `Error getting post titled ${postTitle}`;
  }
}

export {getOne};
