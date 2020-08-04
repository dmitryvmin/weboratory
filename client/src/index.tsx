// Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

// App
import "./index.scss";
import App from "./App";
import history from "./utils/history";
import { Auth0Provider } from "@utils/hooks/useAuth0";
import { getEnv } from "@configs/env";

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "https://weboratory.herokuapp.com/api/v1/events",
});

const client = new ApolloClient({
  link,
  cache,
});

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Auth0Provider
        domain={getEnv("AUTH_DOMAIN")}
        client_id={process.env.REACT_APP_AUTH_CLIENT_ID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        {/*<Auth0LockProvider>*/}
        <App/>
        {/*</Auth0LockProvider>*/}
      </Auth0Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root"),
);
