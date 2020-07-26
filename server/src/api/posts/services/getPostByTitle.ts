import Posts from "../../../db/models/objection/Posts";

/**
 * Retrieves post row by title
 * @param title
 */
async function getPostByPostTitle(title) {
  const post = await Posts
    .query()
    .where("title", title)
    .first();

  return post;
}

export {getPostByPostTitle};
