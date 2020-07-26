'use strict';

import {
  getAll,
  addOne,
  deleteOne,
  removeTagFromAll,
} from "./tag.controllers";

function createTagsRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/tags`,
  });

  router
    .get('/', getAll)
    .post('/', addOne)
    .put("/:tagId", removeTagFromAll)
    .delete('/:id', deleteOne);

  return router;
};

export {createTagsRouter};
