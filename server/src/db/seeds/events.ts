import * as Knex from "knex";
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("events").del()
    .then(() => {
      // Inserts seed entries
      return knex("events").insert([
        {
          event_id: uuidv4(),
          user_id: "",
          title: "Event Title",
          location: "",
          coordinates: '{"lat": "", "lng": ""}',
          time: "",
          content: "",
        },
      ]);
    });
};
