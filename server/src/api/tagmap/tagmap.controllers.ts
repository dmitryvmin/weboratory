"use strict";

// Libs
import * as HttpStatus from "http-status";
import { Context } from "koa";

// Services
import { getTagsIdForPostId, removeTagFromTagMapById } from "./tagmap.services";

// Schema
import TagMap from "../../db/models/objection/TagMap";
import Tags from "../../db/models/objection/Tags";
import { deleteTagById, getAllTags, getTagsFromTagsIds } from "../tags/tag.services";

/**
 * Retrieves Tag Ids mapped to the provided Post id
 * @param post_id
 *
 * @return tagId[]
 */
async function getOne(ctx: Context, next: () => Promise<any>) {

  // Get the post_id from the request
  const { postId: post_id } = ctx.params;

  if (!post_id) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = `No post_id provided to query the TagMap table: ${post_id}`;
    return;
  }

  try {
    const tagsIds = await getTagsIdForPostId(post_id);
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

    const tagIds = await getTagsIdForPostId(postId);

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
    const tagIds = await getTagsIdForPostId(postId);
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

export {
  getOne,
  deleteTagFromPost,
  addTagByTagId,
};
