// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { createNewPost } from "../services";
import { addTagsByTagTitle } from "../../tags/tag.services";
import { addTagMapTagsByPostId } from "../../tagmap/tagmap.services";

/**
 * Saves new Post to the Posts table.
 * If tags have been provided, updates the Tags table.
 * @param tagTitle[]
 *
 * @return tagId[]
 */
async function addOne(ctx: Context, next: () => Promise<any>) {

  if (!ctx.request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  const {
    title,
    content,
    tags,
  } = ctx.request.body;

  if (!title) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Post title is missing.";
    return;
  }

  if (!content) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Post content is missing.";
    return;
  }

  try {
    // 1. Update the Posts table
    const post = await createNewPost({ title, content });

    // 2. If new tags have been provided, update the Tags table.
    // Retrieve their ids for updating the TagMap table
    const tagIds = await addTagsByTagTitle(tags);

    // 3. Update the TagMap table, conditionally adding tag_ids
    const tagMap = await addTagMapTagsByPostId(post.id, tagIds);

    ctx.status = HttpStatus.CREATED;
    ctx.body = {
      post,
      tagMap,
    };
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      title,
      content,
      ...(tags && { tags }),
    };
  }
}

export {addOne};
