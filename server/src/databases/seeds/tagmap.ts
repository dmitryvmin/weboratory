import { v4 as uuidv4 } from 'uuid';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tagmap")
    .del()
    .then(async function() {
      // Get foreign-keys from Posts and Tags tables
      const posts = await knex.select("id").from("posts");
      const tags = await knex.select("id").from("tags");

      // Get all tags ids
      const tagsIds = tags.reduce((a, c) => [...a, c.id], []);

      // Create tagmap
      const tagmap = [];
      posts.forEach(({ id }) => {
        tagmap.push({
          id: uuidv4(),
          tag_ids: tagsIds,
          post_id: id,
        });
      });

      // Inserts seed entries
      return knex("tagmap").insert(tagmap);
    });
};
