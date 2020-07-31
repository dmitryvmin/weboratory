// Schema
import TagMap from "../../models/objection/TagMap";
import { Context } from "koa";
import * as HttpStatus from "http-status";
import { createNewTag, getTagByTagTitle } from "../tags/tag.services";
import Tags from "../../models/objection/Tags";

/**
 * Removes associated row from the TagMap table
 * @param post_id
 */
async function removeTagMapByPostId(post_id) {
  await TagMap
    .query()
    .where({ post_id })
    .del();
}

/**
 * Adds a new tag array
 */
async function addTagMapTagsByPostId(post_id, tag_ids) {
  const tagMap = await TagMap
    .query()
    .insert({
      post_id,
      ...(tag_ids && { tag_ids }),
    })
    .first();

  return tagMap;
}

/**
 * Overwrites the tag array
 */
async function updateTagMapTagsByPostId(post_id, tag_ids) {
  try {
    const tagMap = await TagMap.query()
      .where({ post_id })
      .update({
        tag_ids,
      })
      .returning("*")
      .first();

    return tagMap;
  }
  catch(err) {
    console.log(`Couldn't update TagMap post_id ${post_id} with tag_ids: ${tag_ids}. ${err}`);
  }
}

/**
 * Retrieves tags ids associated with a post_id
 */
async function getTagsIdForPostId(postId) {
  try {
    const tagIds = await TagMap.query()
      .where({
        post_id: postId,
      })
      .first()
      .then(row => {
        return row && row.tag_ids;
      });

    return tagIds;
  }
  catch(err) {
    console.log(`Couldn't retrieve tags ids for post ${postId}. ${err}`);
    return [];
  }
}

/**
 * Appends to the tag array
 */
async function appendTagMapTagByPostId(post_id, tag_id) {
  try {
    const tagMap = await TagMap.query()
      .where({ post_id })
      .update({
        tag_ids: TagMap.raw("array_append(tag_ids, ?)", tag_id),
      })
      .returning("*")
      .first();

    return tagMap;
  }
  catch (err) {
    console.log(`Couldn't update TagMap post_id ${post_id} with tag_id: ${tag_id}. ${err}`);
  }
}

/**
 * Retrieve TagMap row given the post_id
 * @param post_id
 * @return tagMap
 */
async function getTagMapByPostId(post_id) {

  let tagMap = await TagMap
    .query()
    .where({ post_id })
    .first()
    .catch((err) => {
      console.log(`TagMap contains no post with id: ${post_id}. Error: ${err}.`);
    });

  return tagMap;
}

/**
 * Remove tag_id from a post's TagMap table
 * @param postId
 * @param tagId
 *
 * @return
 */
async function removeTagFromTagMapById(
  postId: string,
  tagId: string,
  tagIds: string[],
  ) {
  // Remove tagId from this post's tagMap
  const updatedTagIds = tagIds?.filter((t) => t !== tagId);

  try {
    const tagMap = await TagMap
      .query()
      .where("post_id", postId)
      .update({
        tag_ids: updatedTagIds,
      })
      .returning('*');

    return tagMap[0];
  }
  catch(err) {
    console.log(`Errored out updating Post ${postId} with new tagMap that had tagId ${tagId} removed.`);
  }
}

/**
 * Remove a tag from all tag-maps that contain it
 * Notes:
 * - https://coderwall.com/p/1b5eyq/index-for-uuid-array-data-type
 * @param tagId
 */
async function removeTagFromTagMaps(tagId: string) {
  try {
    await TagMap.query()
      .select("post_id")
      .select("tag_ids")
      .then(async (tagMaps) => {

        // Take each tagMap row and see if its tagIds array
        // contains the tagId we want to remove
        for (let i = 0; i < tagMaps.length; i++) {
          const {
            post_id,
            tag_ids,
          }: {post_id: string, tag_ids: string[]} = tagMaps[i];

          // If tagId is present, remove it and update the tagMap row
          if (tag_ids.includes(tagId)) {
            await removeTagFromTagMapById(post_id, tagId, tag_ids);
          }
        }

      });
    console.log`Removed tagId ${tagId} from the TagMap Table.`;
    return;
  }
  catch (err) {
    console.log(`Error removing tagId: ${tagId} from TagMap: ${err}.`);
    return;
  }
}

/**
 * Updates Post tags in the TagMap tables
 * Requires either post_id OR tag_id / tag_title
 */
async function addTagByTagTitle(ctx: Context, next: () => Promise<any>) {

  const { request, status, body } = ctx;

  // Get the request payload
  if (!request.hasOwnProperty("body")) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request contains no body.";
    return;
  }

  const {
    post_id,
    tag_title,
  } = request.body;

  if (!post_id) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = "Request missing post_id.";
    return;
  }

  if (!tag_title) {
    ctx.status = HttpStatus.NOT_ACCEPTABLE;
    ctx.body = `Request requires a tag_id: ${tag_title}.`;
    return;
  }

  const tagMap = await getTagMapByPostId(post_id);
  const { id: tagId } = await getTagByTagTitle(tag_title);
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
    const { id: newTagId } = await createNewTag(tag_title);
    updated_tagmap = await appendTagMapTagByPostId(post_id, newTagId);
  }

  ctx.status = HttpStatus.OK;
  ctx.body = `Tag added to the post successfully: ${JSON.stringify(updated_tagmap)}`;
}

export {
  removeTagFromTagMaps,
  removeTagMapByPostId,
  addTagMapTagsByPostId,
  getTagMapByPostId,
  updateTagMapTagsByPostId,
  appendTagMapTagByPostId,
  getTagsIdForPostId,
  removeTagFromTagMapById,
  addTagByTagTitle,
};
