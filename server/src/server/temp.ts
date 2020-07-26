// Libs
import * as Koa from "koa";
import * as compress from "koa-compress";
import * as cors from "@koa/cors";
import * as helmet from "koa-helmet";
import * as logger from "koa-logger";
import * as mount from "koa-mount";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
import * as json from "koa-json";
import * as path from "path";
import * as Router from "koa-router";
import * as send from "koa-send";

// App
import { userAgentHandler } from "../middleware/userAgent.middleware";
import { errorHandler } from "../middleware/error.middleware";
import { applyApiMiddleware } from "../api";
import { config } from "../config";

// Constants
const { isProduction } = config.serverConfig;
const { isDevelopment } = config.serverConfig;

function initKoa() {
  const serverApp = new Koa();

  /**
   * Koa Middleware
   */
  serverApp
    .use(errorHandler)
    .use(userAgentHandler)
    .use(helmet())
    .use(compress())
    .use(cors())
    .use(json())
    .use(bodyParser());

  /**
   * Development middleware
   */
  if (isDevelopment) {
    serverApp.use(logger());
  }

  /**
   * Production middleware
   */
    // Serve FE build bundle
    // if (isProduction) {
  const webApp = new Koa();
  const FE_APP_BUILD_PATH = path.resolve(__dirname + "../../../../client/build/");
  // webApp.use(serve(FE_APP_BUILD_PATH));

  const webRouter = new Router();
  webRouter.get("*", async (ctx, next) => {
    console.log("@@", `FE: ${FE_APP_BUILD_PATH}`, ctx);
    await send(ctx, FE_APP_BUILD_PATH);
    // await send(ctx, ctx.path, { root: FE_APP_BUILD_PATH });
    // ctx.body = `FE: ${FE_APP_BUILD_PATH}`;
    // serve(FE_APP_BUILD_PATH);
  });

  webApp
    .use(webRouter.routes())
    .use(webRouter.allowedMethods());

  serverApp.use(
    async (ctx, next) =>
      await serve(FE_APP_BUILD_PATH)(
        Object.assign(ctx, { path: "index.html" }),
        next,
      ),
  );

  // serverApp.use(mount("/", webApp));
  serverApp.use(serve(FE_APP_BUILD_PATH));
  // }

  /** API */
  applyApiMiddleware(serverApp);

  return serverApp;
}

export { initKoa };