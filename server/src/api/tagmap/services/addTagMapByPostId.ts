import TagMap from "../../../models/objection/TagMap";

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

export {addTagMapTagsByPostId};
