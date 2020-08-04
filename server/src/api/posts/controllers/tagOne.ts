// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// App
import { createNewTag } from "../../tags/tag.services";
import Tags from "../../../models/objection/Tags";
import { getTagMapByPostId } from "../../tagmap/services/getTagMapByPostId";
import { updateTagMapTagsByPostId } from "../../tagmap/services/updateTagMapTagsByPostId";
import { appendTagMapTagByPostId } from "../../tagmap/services/appendTagMapTagByPostId";

/**
 * Updates Post tags in the TagMap tables
 * Requires either post_id OR tag_id / tag_title
 */
async function tagOne(ctx: Context, next: () => Promise<any>) {

  const { request } = ctx;

  // Get the request payload
  if (!request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  const {
    post_id,
    tag_id,
    tag_title,
  } = request.body;

  if (!post_id) {
    ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
    ctx.body = "Request missing post_id.";
    return;
  }

  if (!tag_title && !tag_id) {
    ctx.status = HttpStatus.UNPROCESSABLE_ENTITY;
    ctx.body = `Request to Tag a post requires tag_id: ${tag_id} or tag_title: ${tag_title}.`;
    return;
  }

  const tagMap = await getTagMapByPostId(post_id);
  let updatedTagmap;

  // Remove Tag
  if (
    tag_id &&
    tagMap &&
    tagMap?.tag_ids.length &&
    tagMap.tag_ids.includes(tag_id)
  ) {
    const new_tag_ids = tagMap.tag_ids.filter(id => id !== tag_id);
    updatedTagmap = updateTagMapTagsByPostId(post_id, new_tag_ids);
  }
  // Add Tag
  else {
    const { id: newTagId } = await createNewTag({tagTitle: tag_title, tagId: tag_id});
    updatedTagmap = await appendTagMapTagByPostId(post_id, newTagId);
  }

  const tags = await Tags
    .query()
    .findByIds(updatedTagmap.tag_ids);

  ctx.status = HttpStatus.OK;
  ctx.body = tags;
}

export { tagOne };
