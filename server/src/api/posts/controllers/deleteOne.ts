// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { removeTagMapByPostId } from "../../tagmap/tagmap.services";
import { deletePostByPostId } from "../services";

/**
 * Deletes a Post row from the Posts table by id.
 *
 * @return new Post[]
 */
async function deleteOne(ctx: Context, next: () => Promise<any>) {

  // Get the id value from the request
  const { postId } = ctx.params;

  // Make sure postId value exists.
  if (!postId) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Post id is missing.";
    return;
  }

  try {
    await removeTagMapByPostId(postId);
    await deletePostByPostId(postId);
    ctx.status = HttpStatus.OK;
    ctx.body = `Post with id ${postId} deleted successfully and removed from the TagMap table.`;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error deleting post with id: ${postId}`;
  }
}

export {deleteOne};
