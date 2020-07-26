/**
 * Retrieves Tag Ids mapped to the provided Post Id
 * @param post_id
 *
 * @return tagId[]
 */
function getTagMap(postId: string) {
  return `api/v1/tagmap/${postId}`;
}

/**
 * Deletes a Tag Id from a TagMap for the provided Post Id
 */
function deleteTagFromPostURI(postId: string, tagId: string) {
  return `api/v1/tagmap/${postId}/${tagId}`;
}

/**
 * Adds a Tag Id from to the TagMap of the provided Post Id
 */
function addTagByTagIdURI(postId: string, tagId: string) {
  return `api/v1/tagmap/${postId}/id/${tagId}`;
}

/**
 * Adds a Tag Id from to the TagMap of the provided Post Id
 */
function addTagByTagTitleURI(postId: string, tagTitle: string) {
  return `api/v1/tagmap/${postId}/title/${tagTitle}`;
}

export {
  getTagMap,
  deleteTagFromPostURI,
  addTagByTagIdURI,
  addTagByTagTitleURI,
};
