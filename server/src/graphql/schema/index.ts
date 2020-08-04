// Libs
import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-koa';

// Apps
import { typeDef as User, resolvers as UserResolvers } from './types/User';
import { typeDef as Events, resolvers as EventsResolvers } from './types/Events';

const Query = gql`
  # Put fake fields on each Query & Mutation as below because currently schema cannot have empty type
  # If you had Query & Mutation fields not associated with a specific type you could put them here
  type Query {
    _empty: String
  }
  type Mutation {
    null: Boolean
  }
`;

const SchemaDefinition = gql`
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
};

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    User,
    Events,
  ],
  resolvers: {
    ...resolvers,
    ...UserResolvers,
    ...EventsResolvers,
  },
});
