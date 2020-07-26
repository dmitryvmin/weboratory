import Posts from "../../../db/models/objection/Posts";

/**
 * Retrieves all post rows
 * @return post[]
 */
async function getAllPosts() {
  const posts = await Posts.query();
  return posts;
}

export {getAllPosts};