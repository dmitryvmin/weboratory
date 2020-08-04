// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { getTagsFromTagsIds } from "../../tags/tag.services";
import { getTagIdsForPostId } from "../services/getTagIdsForPostId";
import { removeTagFromTagMapById } from "../services/removeTagFromTagMapById";

/**
 * Deletes a TagMap row by post_id.
 *
 * @return tag[]
 */
async function deleteTagFromPost(ctx: Context, next: () => Promise<any>) {

  // Get the id value from the request
  const { postId, tagId } = ctx.params;

  // Make sure postId value exists.
  if (!postId) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Post id is missing.";
    return;
  }

  // Make sure tagId value exists.
  if (!tagId) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Tag id is missing.";
    return;
  }

  try {
    const tagIds = await getTagIdsForPostId(postId);
    const tagMap = await removeTagFromTagMapById(postId, tagId, tagIds);
    const tags = await getTagsFromTagsIds(tagMap.tag_ids);

    ctx.status = HttpStatus.OK;
    ctx.body = tags;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error removing tag: ${tagId} from the tagmap for post ${postId}`;
  }
}

export {deleteTagFromPost};
