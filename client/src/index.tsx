// Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";

// App
import "./index.scss";
import App from "./App";
import history from "./utils/history";
import { Auth0Provider } from "@utils/hooks/useAuth0";
import { getEnv } from "@configs/env";
import { configureStore } from "@stores/globalStore";

// Constants
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: getEnv("GRAPHQL_SERVER"),
});

// Store
const globalStore = configureStore();

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

const Root = ({ store }) => (
  <Provider store={store}>
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
    </ApolloProvider>
  </Provider>
)

ReactDOM.render(<Root store={globalStore} />, document.getElementById("root"));
