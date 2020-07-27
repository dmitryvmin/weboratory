"use strict";

import { getUserEvents } from "./controllers/getUserEvents";
import { updateEvent } from "./controllers/updateEvent";
import { getAllEventsByVisibility } from "./controllers/getAllEventsByVisibility";

function createEventsRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/events`,
  });

  let createEvent;
  router
    .get("/:userId", getUserEvents)
    .get("/vis/:visibility", getAllEventsByVisibility)
    .put("/:eventId", updateEvent)
    .post(createEvent);

  return router;
};

export { createEventsRouter };
