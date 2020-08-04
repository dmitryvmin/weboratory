// Libs
import { Context } from "koa";
import * as HttpStatus from "http-status";

// Tagmap services
import { getTagMapByPostId } from "./getTagMapByPostId";
import { updateTagMapTagsByPostId } from "./updateTagMapTagsByPostId";
import { appendTagMapTagByPostId } from "./appendTagMapTagByPostId";

// Tag services
import { createNewTag, getTagByTagTitle } from "../../tags/tag.services";

/**
 * Updates Post tags in the TagMap tables
 * Requires either post_id OR tag_id / tag_title
 */
async function addTagByTagTitle(ctx: Context, next: () => Promise<any>) {

  const { request } = ctx;

  // Get the id value from the request
  const { postId: post_id, tagTitle: tag_title } = ctx.params;

  // // Get the request payload
  // if (!request.hasOwnProperty("body")) {
  //   ctx.status = HttpStatus.NOT_ACCEPTABLE;
  //   ctx.body = "Request contains no body.";
  //   return;
  // }
  //
  // const {
  //   post_id,
  //   tag_title,
  // } = request.body;
  //
  // if (!post_id) {
  //   ctx.status = HttpStatus.NOT_ACCEPTABLE;
  //   ctx.body = "Request missing post_id.";
  //   return;
  // }
  //
  // if (!tag_title) {
  //   ctx.status = HttpStatus.NOT_ACCEPTABLE;
  //   ctx.body = `Request requires a tag_id: ${tag_title}.`;
  //   return;
  // }

  try {
    const tagMap = await getTagMapByPostId(post_id);
    let tagId;

    try {
      const tag = await getTagByTagTitle(tag_title);
      tagId = tag.id;
    }
    catch(err) {
      console.log(`Tag titled ${tag_title}, doesn't exist.`, err.message);
    }
    let updated_tagmap;

    // Remove Tag
    if (
      tagId &&
      tagMap &&
      tagMap.tag_ids &&
      tagMap.tag_ids.length &&
      tagMap.tag_ids.includes(tagId)
    ) {
      const new_tag_ids = tagMap.tag_ids.filter(id => id !== tagId);
      updated_tagmap = updateTagMapTagsByPostId(post_id, new_tag_ids);
    }
    // Add Tag
    else {
      let newTagId;
      try {
        const newTag = await createNewTag({tagTitle: tag_title});
        newTagId = newTag.id;
      }
      catch(err) {
        console.log(`New tag titled ${tag_title}, doesn't exist.`, err.message);
      }

      updated_tagmap = await appendTagMapTagByPostId(post_id, newTagId);
    }

    ctx.status = HttpStatus.OK;
    ctx.body = `Tag added to the post successfully: ${updated_tagmap}`;
  }
  catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `Error adding post to tag: ${err}`;
  }
}

export {addTagByTagTitle};
