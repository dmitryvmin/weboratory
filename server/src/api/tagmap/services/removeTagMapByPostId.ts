// Model
import TagMap from "../../../models/objection/TagMap";

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

export { removeTagMapByPostId };
