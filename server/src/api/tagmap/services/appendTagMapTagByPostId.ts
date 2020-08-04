import TagMap from "../../../models/objection/TagMap";

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

export {appendTagMapTagByPostId};
