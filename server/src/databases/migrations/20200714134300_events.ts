import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.createTable("events", table => {
      table
        .uuid("event_id")
        .primary()
        .notNullable()
        .unique()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .string("")
        .notNullable();
      table.specificType("associated_ids", "uuid[]");
      table.string("content", 100000).notNullable();
      table
        .string("status")
        .notNullable()
        .defaultTo("DRAFT");
      table.string("title", 256);
      table.string("visibility", 256);
      table.string("address", 10000);
      table.jsonb("coordinates");
      table.string("time", 1000);
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
  return Promise.all([knex.schema.dropTable("events")]);
}
