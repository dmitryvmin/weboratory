// Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

// App
import "./index.scss";
import App from "./App";
import history from "./utils/history";

import { getEnv } from "@configs/env";

// Constants
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: getEnv("GRAPHQL_SERVER"),
});

const client = new ApolloClient({
  link,
  cache,
});

const domain = getEnv("AUTH_DOMAIN");

const Root = () => (
    <ApolloProvider client={client}>
      <Router>
        <Auth0Provider
          // domain={domain}
          clientId={process.env.REACT_APP_AUTH_CLIENT_ID!}
          // redirect_uri={window.location.origin}
          domain="weboratory.auth0.com"
          redirectUri={window.location.origin}
        >
          <App/>
        </Auth0Provider>
      </Router>
    </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById("root"));
