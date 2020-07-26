import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
 return Promise.all([
    knex.schema
      .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
      .createTable("posts", table => {
        table
          .uuid("id")
          .primary()
          .notNullable()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("title", 256).unique();
        table.string("content", 100000).notNullable();
        table
          .boolean("draft")
          .notNullable()
          .defaultTo(true);
        table
          .timestamp("created_at", true)
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp("updated_at", true)
          .notNullable()
          .defaultTo(knex.fn.now());
      }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable("posts")]);
}
