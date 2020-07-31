import { v4 as uuidv4 } from 'uuid';

exports.seed = function(knex) {
  return knex("tags")
    .del()
    .then(() => {
      return knex("tags").insert([
        {
          id: uuidv4(),
          title: "Tag1",
        },
        {
          id: uuidv4(),
          title: "Tag2",
        },
        {
          id: uuidv4(),
          title: "Tag3",
        },
      ]);
    });
};
