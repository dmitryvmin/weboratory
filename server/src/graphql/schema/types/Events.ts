// Libs
import { gql } from "apollo-server-koa";
const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");

// App
import { queryUpdateEvent } from "../../../../api/events/services/queryUpdateEvent";
import { queryCreateEvent } from "../../../../api/events/services/queryCreateEvent";
import { queryEventsByVisibility } from "../../../../api/events/services/queryEventsByVisibility";

const Coordinates = new GraphQLInputObjectType({
  name: "Coordinates",
  lat: { type: new GraphQLNonNull(GraphQLFloat) },
  lon: { type: new GraphQLNonNull(GraphQLFloat) },
});

const inputEvent = new GraphQLInputObjectType({
  name: "EventInput",
  fields: {
    content: { type: GraphQLString },
    status: { type: GraphQLString },
    title: { type: GraphQLString },
    address: { type: GraphQLString },
    time: { type: GraphQLString },
    coordinates: { type: Coordinates },
  }
});

export const typeDef = gql`
  type Event {
    eventId: ID
    userId: ID
    associatedIds: String
    content: String
    status: String
    title: String
    address: String
    createdAt: String
    updatedAt: String
    coordinates: String
    visibility: String
  }
  
  input inputEvent {
    event: inputEvent
  }
  
  extend type Query {
    getEventsByUserId(userId: ID!): [Event]
    getEventsByVisibility(visibility: String): [Event]
    findAll: [Event]
  }
  
   extend type Mutation {
    createEvent(data: inputEvent): [Event]
    updateEvent(id: ID!, data: inputEvent): [Event]
  }
`;

export const resolvers = {
  Query: {
    findAll: async (root, args, { models }) => {
      return models.Events.findAll();
    },
    getEventsByUserId: async (root, { userId }, { models }) => {
      // if (!user) {
      //   throw new Error('You are not authenticated!');
      // }
      return models.Events.getEventsByUserId({ userId });
    },
    getEventsByVisibility: async (root, { visibility }, { user, models }) => {
      return models.Events.getEventsByVisibility({ visibility });
    },
  },
  Mutation: {
    createEvent: async (root, { data }, { models }) => {
      return models.Events.createEvent(data);
    },
    updateEvent: async (root, { eventId, data }, { models }) => {
      return models.Events.queryUpdateEvent(eventId, data);
    },
  },
};
