import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable("tagmap", table => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.specificType("tag_ids", "uuid[]");
      table
        .uuid("post_id")
        .references("id")
        .inTable("posts")
        .notNullable();
    }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([knex.schema.dropTable("tagmap")]);
}
