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
  if (isProduction) {
    const FE_APP_BUILD_PATH = path.resolve(__dirname + "../../../../client/build/");
    const webApp = new Koa();
    webApp.use(serve(FE_APP_BUILD_PATH));
    serverApp.use(mount("/", webApp));
  }

  /** API */
  applyApiMiddleware(serverApp);

  return serverApp;
}

export { initKoa };