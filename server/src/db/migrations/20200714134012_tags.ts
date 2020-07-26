import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable("tags", table => {
        table
          .uuid("id")
          .primary()
          .notNullable()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("title", 256).unique();
      }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable("tags")]);
}
