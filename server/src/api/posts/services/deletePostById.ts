import Posts from "../../../db/models/objection/Posts";

/**
 * Removes row from the Posts table by post id
 * @param id
 */
async function deletePostByPostId(id) {
  await Posts
    .query()
    .deleteById(id);
}

export {deletePostByPostId};
