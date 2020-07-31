// App
import { config } from "../../config";

// Libs
import * as knex from "knex";
import * as path from "path";
import * as pg from "pg";

// Constants
const extension = process.env.NODE_CONFIG_ENV === "production" ? 'js' : 'ts';
// pg.defaults.ssl = true;

module.exports = {
  // development: {
  //   client: "pg",
  //   connection: config.dbConfig.dev_url,
  //   migrations: {
  //     directory: path.resolve("./migrations"),
  //     loadExtensions: [`.${extension}`],
  //   },
  //   seeds: {
  //     directory: path.resolve("./seeds"),
  //     loadExtensions: [`.${extension}`],
  //   },
  //   pool: {
  //     min: 0,
  //     max: 10
  //   }
  // },
  development: {
    client: "pg",
    connection: {
      host: config.dbConfig.host,
      user: config.dbConfig.user,
      password: config.dbConfig.password,
      database: config.dbConfig.database,
      port: config.dbConfig.port,
    },
    migrations: {
      directory: path.resolve("./src/db/migrations"),
      extension: extension,
    },
    seeds: {
      extension: extension,
      directory: path.resolve("./src/db/seeds"),
    },
    pool: {
      min: 0,
      max: 10
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: path.resolve("./migrations"),
      extension: extension,
      // disableMigrationsListValidation: true,
      // loadExtensions: [`.${extension}`],
    },
    seeds: {
      extension: extension,
      directory: path.resolve("./seeds"),
    },
    pool: {
      min: 0,
      max: 10
    }
  },
} as knex.Config;
