/**
 * Retrieves all available Tag ids
 *
 * @return tagId[]
 */
function getAllTagIdsURI() {
  return `api/v1/tags`;
}

function deleteTagURI(tagId: string) {
  return `api/v1/tags/${tagId}`;
}

/**
 * Remove Tag from TagMap and Tag Table
 */
function deleteTagFromAllURI(tagId: string) {
  return `api/v1/tags/${tagId}`;
}

export {
  getAllTagIdsURI,
  deleteTagURI,
  deleteTagFromAllURI,
};
