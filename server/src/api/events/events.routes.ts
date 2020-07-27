"use strict";

import { getUserEvents } from "./controllers/getUserEvents";
import { updateEvent } from "./controllers/updateEvent";

function createEventsRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/events`,
  });

  router
    .get("/:userId", getUserEvents)
    .put("/:eventId", updateEvent);

  return router;
};

export { createEventsRouter };
