import TagMap from "../../../models/objection/TagMap";

/**
 * Retrieve TagMap row given the post_id
 * @param post_id
 * @return tagMap
 */
async function getTagMapByPostId(post_id) {
  try {
    let tagMap = await TagMap
      .query()
      .where({ post_id })
      .first()
      .catch((err) => {
        console.log(`TagMap contains no post with id: ${post_id}. Error: ${err}.`);
      });

    return tagMap;
  }
  catch (error) {
    throw Error(error);
  }
}

export {getTagMapByPostId};
