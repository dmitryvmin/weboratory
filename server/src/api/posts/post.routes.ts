'use strict';

import {
  getOne,
  deleteOne,
  getAll,
  addOne,
  updateOne,
  tagOne,
} from './controllers';

function createPostsRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/posts`,
  });

  router
    .get('/:postTitle', getOne)
    .delete('/:postId', deleteOne)
    .get("/", getAll)
    .post("/", addOne)
    .put("/", updateOne)
    .put("/tag", tagOne);

  return router;
};

export {createPostsRouter};
