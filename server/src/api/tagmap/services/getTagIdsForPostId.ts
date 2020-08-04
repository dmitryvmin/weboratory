import TagMap from "../../../models/objection/TagMap";

/**
 * Retrieves tags ids associated with a post_id
 */
async function getTagIdsForPostId(postId) {
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

export {getTagIdsForPostId};
