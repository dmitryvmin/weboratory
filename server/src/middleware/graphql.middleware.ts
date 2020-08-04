// Libs
import { ApolloServer } from "apollo-server-koa";

// App
import models from '../graphql/connectors';
import schema from "../graphql/schema/index";

const graphqlHandler = async (ctx, next) => {

  const apolloMiddleware = new ApolloServer({
    schema,
    context: ({ ctx: { state } }) => ({
      models,
    }),
    introspection: true,
    playground: true,
  });

};