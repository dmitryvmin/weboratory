// Libs
import * as http from "http";
import { AddressInfo } from "net";

// App
import { initKoa } from "./server/index";
import { initDB } from "./db";
import { config } from "./config";

// Constants
const port = config.serverConfig.server.port;

async function bootstrap() {
  await initDB();
  const koaServer = initKoa();
  const httpServer = http
    .createServer(koaServer.callback())
    .listen(port);

  return httpServer;
}

bootstrap()
  .then((server) =>
    console.log(`🚀 Server listening on port ${(server.address() as AddressInfo).port}!`),
  )
  .catch(err => {
    setImmediate(() => {
      console.error(`Unable to run the server because of the following error: ${err}`);
      process.exit();
    });
  });
