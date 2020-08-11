"use strict";
// App
import { Context } from "koa";
import * as HttpStatus from "http-status";

async function getPhotos(ctx: Context, next: () => Promise<any>) {

  // GOOGLE_PHOTOS_CLIENT_ID
  // GOOGLE_PHOTOS_CLIENT_SECRET

  ctx.status = HttpStatus.OK;
  ctx.body = "Photos callback";

}

function createPhotosRouter(Router, prefix) {

  const router = new Router({
    prefix: `${prefix}/photos`,
  });

  router
    .get("/", getPhotos)

  return router;
};



export { createPhotosRouter };
