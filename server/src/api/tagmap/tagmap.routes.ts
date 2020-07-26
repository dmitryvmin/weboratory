"use strict";

import {
  getOne,
  deleteTagFromPost,
  addTagByTagId,
} from "./tagmap.controllers";

// TODO: Move to controllers
import { addTagByTagTitle } from "./tagmap.services";

function createTagMapRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/tagmap`,
  });

  router
    .get("/:postId", getOne)
    // TODO: combine addTagByTagId && addTagByTagTitle into a single controller
    .post("/:postId/id/:tagId", addTagByTagId)
    .post("/:postId/title/:tagTitle", addTagByTagTitle)
    .delete("/:postId/:tagId", deleteTagFromPost);

  return router;
};

export {createTagMapRouter};
