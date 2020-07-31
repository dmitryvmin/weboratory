import Posts from "../../../models/objection/Posts";

/**
 * Creates a new Post with title and content
 * @param title
 * @param content
 *
 * @return post_row
 */
async function createNewPost({ title, content }) {
  const post = await Posts
    .query()
    .insert({
      title,
      content,
    });

  return post;
}

export {createNewPost};
