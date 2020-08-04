import { Events } from "../../models/objection/Events";
import { queryEventsByVisibility } from "../../api/events/services/queryEventsByVisibility";
import { queryCreateEvent } from "../../api/events/services/queryCreateEvent";
import { queryUpdateEvent } from "../../api/events/services/queryUpdateEvent";

const models = {
  Events: {

    async findAll() {
      const events = Events
        .query()
        .select();

      return events;
    },

    async getEventsByUserId({ userId }) {
      const events = await Events
        .query()
        .select()
        .where({ userId });

      if (events && events.length !== 0) {
        return events;
      }

      return null;
    },

    async getEventsByVisibility({ visibility }: {visibility: string}) {
      const events = await queryEventsByVisibility(visibility);

      if (events && events.length !== 0) {
        return events;
      }

      return null;
    },

    async createEvent({ data, userId }) {
      const event = await queryCreateEvent(data);
      return event;
    },

    async updateEvent({ eventId, data }) {
      const event = await queryUpdateEvent(eventId, data);
      return event;

    },
  },
};

export default models;