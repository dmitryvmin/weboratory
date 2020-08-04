"use strict";

import { getPostTagMap } from "./controllers/getPostTagMap";
import { addTagByTagTitle } from "./services/addTagByTagTitle";
import { addTagByTagId } from "./controllers/addTagByTagId";
import { deleteTagFromPost } from "./controllers/deleteTagFromPost";

function createTagMapRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/tagmap`,
  });

  router
    .get("/:postId", getPostTagMap)
    .delete("/:postId/:tagId", deleteTagFromPost)
    // TODO: combine addTagByTagId && addTagByTagTitle into a single controller
    .post("/:postId/id/:tagId", addTagByTagId)
    .post("/:postId/title/:tagTitle", addTagByTagTitle);

  return router;
};

export {createTagMapRouter};
