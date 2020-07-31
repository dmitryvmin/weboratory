import Posts from "../../../models/objection/Posts";

/**
 * Updates post title and content given the post id
 * @param id
 *
 * @return post_row
 */
async function updatePostByPostId(id, data) {
  const {title, content} = data;
  const post = await Posts.query()
    .where({id})
    .update({
      ...(title && {title}),
      ...(content && {content}),
    })
    .returning("*")
    .first();

  return post;
}

export {updatePostByPostId};
