// Libs
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// App
import "./index.scss";
import App from "./App";
import history from "./utils/history";
import { Auth0Provider } from "@utils/hooks/useAuth0";
import { getEnv } from "@configs/env";

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={getEnv("AUTH_DOMAIN")}
      client_id={process.env.AUTH_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {/*<Auth0LockProvider>*/}
        <App/>
      {/*</Auth0LockProvider>*/}
    </Auth0Provider>
  </Router>,
  document.getElementById("root"),
);
