// Libs
import { ApolloServer } from "apollo-server-koa";

// App
import models from './connectors';
import schema from "./schema";

/**
 * Sets up a graphQl server + Events service
 */
function iniGraphQlServer(app, router) {

  const apolloServer = new ApolloServer({
    schema,
    context: ({ ctx: { state } }) => ({
      models,
    }),
    introspection: true,
    playground: true,
  });

  // router.post('/graphql', apolloServer);
  // router.get('/graphql', apolloServer);

  app.use(apolloServer.getMiddleware());

  // apolloServer.applyMiddleware({
  //   app,
  // });
}

export { iniGraphQlServer };
