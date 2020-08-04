// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// Models
import Tags from "../../../models/objection/Tags";

// Tagmap services
import { getTagIdsForPostId } from "../services/getTagIdsForPostId";

/**
 * Retrieves Tag Ids mapped to the provided Post id
 * @param post_id
 *
 * @return tagId[]
 */
async function getPostTagMap(ctx: Context, next: () => Promise<any>) {

  // Get the post_id from the request
  const { postId: post_id } = ctx.params;

  if (!post_id) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `No post_id provided to query the TagMap table: ${post_id}`;
    return;
  }

  try {
    const tagsIds = await getTagIdsForPostId(post_id);
    const tags = [];

    for (let idx = 0; idx < tagsIds.length; idx++) {
      const tag = await Tags
        .query()
        .findById(tagsIds[idx])
        .first();

      if (!tag) {
        return;
      }

      tags.push(tag);
    }

    ctx.status = HttpStatus.OK;
    ctx.body = tags;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Unable to query TagMap table by post_id: ${post_id}. Error: ${err}.`;
  }
}

export {getPostTagMap};
