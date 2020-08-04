import Posts from "../../../models/objection/Posts";

/**
 * Retrieves all post rows
 * @return post[]
 */
async function getAllPosts() {
  try {
    const posts = await Posts.query();
    return posts;
  }
  catch (err) {
    throw(err);
  }
}

export {getAllPosts};