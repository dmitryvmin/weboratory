import TagMap from "../../../models/objection/TagMap";

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

export {removeTagFromTagMapById};
