// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import TagMap from "../../../models/objection/TagMap";
import { getTagsFromTagsIds } from "../../tags/tag.services";
import { getTagIdsForPostId } from "../services/getTagIdsForPostId";

/**
 * Add a tag_id to a TagMap row by post_id.
 *
 * @return Tag[]
 */
async function addTagByTagId(ctx: Context, next: () => Promise<any>) {

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
debugger;
    // Remove duplicate if given tagId already exists
    const newTagIds = Array.from(new Set([tagId, ...tagIds]));

    const tagMap = await TagMap
      .query()
      .where("post_id", postId)
      .update({
        tag_ids: newTagIds,
      })
      .returning("*")
      .first();

    // Get Tag array
    const tags = await getTagsFromTagsIds(tagMap.tag_ids);

    ctx.status = HttpStatus.OK;
    ctx.body = tags;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error adding tag: ${tagId} to the tagmap for post ${postId}`;
  }
}

export {addTagByTagId};
