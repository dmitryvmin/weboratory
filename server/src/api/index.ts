// Libs
import * as Router from "koa-router";

// App
import { config } from "../config";
import { createPostsRouter } from "./posts";
import { createTagMapRouter } from "./tagmap";
import { createTagsRouter } from "./tags";
import { createEventsRouter } from "./events";
import { iniGraphQlServer } from "../graphql";
import { createPhotosRouter } from "./photos";
import { initAuth } from "../auth";

// Constants
const { apiVersion } = config.serverConfig.server;

function applyAPIMiddleware(app) {

  const prefix = `/api/${apiVersion}`;
  const router = new Router({});

  [
    createPostsRouter,
    createTagMapRouter,
    createTagsRouter,
    createEventsRouter,
    createPhotosRouter,
  ].forEach((createRouter) => {
    const api = createRouter(Router, prefix);
    router.use(api.routes());
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

  iniGraphQlServer(app, router);
  initAuth(app, router);
}

export { applyAPIMiddleware };
