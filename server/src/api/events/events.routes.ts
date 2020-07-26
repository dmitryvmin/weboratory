"use strict";

import { getUserEvents } from "./controllers/getUserEvents";

function createEventsRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/events`,
  });

  router
    .get("/:userId", getUserEvents);

  return router;
};

export { createEventsRouter };
