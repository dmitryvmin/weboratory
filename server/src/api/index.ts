// Libs
import * as Router from "koa-router";

// App
import { config } from "../config";
import { createPostsRouter } from "./posts";
import { createTagMapRouter } from "./tagmap";
import { createTagsRouter } from "./tags";
import { createEventsRouter } from "./events";
import { iniGraphQlServer } from "../graphql";

// Constants
const { apiVersion } = config.serverConfig.server;

function applyApiMiddleware(app) {

  const prefix = `/api/${apiVersion}`;
  const router = new Router({});

  [
    createPostsRouter,
    createTagMapRouter,
    createTagsRouter,
    createEventsRouter,
  ].forEach((createRouter) => {
    const api = createRouter(Router, prefix);
    router.use(api.routes());
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  iniGraphQlServer(app, router);
}

export { applyApiMiddleware };
