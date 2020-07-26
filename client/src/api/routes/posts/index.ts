function getPostsURI() {
  return "api/v1/posts";
}

function addPostURI() {
  return "api/v1/posts";
}

function getPostURI(postTitle: string) {
  return `api/v1/posts/${postTitle}`;
}

function getTagPostURI() {
  return "api/v1/posts/tag";
}

function deletePost(postId: string) {
  return `api/v1/posts/${postId}`;
}

function updatePostURI(postId: string, title?: string, content?: string) {
  return `api/v1/posts/`;
}

export {
  getPostsURI,
  getPostURI,
  getTagPostURI,
  deletePost,
  updatePostURI,
  addPostURI,
};
