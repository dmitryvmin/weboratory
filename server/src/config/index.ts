// Libs
import * as dotenv from "dotenv";

// App
import { dbConfig } from "./components/db.config";
import { serverConfig } from "./components/server.config";

// Constants
dotenv.config();

// load envvars from .env in local development
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ silent: true })
}

type IAppConfig = {
  serverConfig?: {
    env: "development" | "production" | "test";
    isProduction: boolean;
    isDevelopment: boolean;
    server: {
      port: number;
      apiVersion: number;
    }
  };
  dbConfig?: {
    dev_url: string;
    url: string;
    user: string;
    host: string;
    password: string;
    database: string;
    port: number;
  };
}

const config: IAppConfig = { dbConfig, serverConfig };

export { config };

