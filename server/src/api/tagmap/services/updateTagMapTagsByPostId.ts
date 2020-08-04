// Model
import TagMap from "../../../models/objection/TagMap";

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
  catch (err) {
    console.log(`Couldn't update TagMap post_id ${post_id} with tag_ids: ${tag_ids}. ${err}`);
  }
}

export { updateTagMapTagsByPostId };
