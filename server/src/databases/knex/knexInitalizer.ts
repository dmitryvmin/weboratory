// Libs
import * as Knex from "knex";
import { Model } from "objection";

// App
import * as knexConfig from "./knexConfig";

// Constants
const environment = process.env.NODE_ENV || 'development';

async function initDB() {
  debugger;
  const knex = await Knex(knexConfig[environment]);
  await Model.knex(knex);
}

export {initDB};
