const rootUrl = `${window.location.protocol}//${window.location.host}`;

type IEnv = "APP" | "API_SERVER";

// TODO move to BE
const envs = {
  // Production
  "https://weboratory.herokuapp.com": {
    APP: "production",
    API_SERVER: "https://weboratory.herokuapp.com",
    AUTH_DOMAIN: "weboratory.auth0.com",
    AUTH_CLIENT_ID: "N0g3dn6XP6yWN1XCSboRsO4nXhcPzrsB",
  },

  // Staging
  // "https://weboratory.herokuapp.com/": {
  //   APP: "staging",
  //   API_SERVER: "http://localhost:3001/api/v1",
  // },

  // Development
  "http://localhost:3001": {
    APP: "development",
    API_SERVER: "https://weboratory.herokuapp.com",
    AUTH_DOMAIN: "weboratory.auth0.com",
    AUTH_CLIENT_ID: "N0g3dn6XP6yWN1XCSboRsO4nXhcPzrsB",
  },
};

function getEnv(env: IEnv) {
  return envs[rootUrl][env];
}

function getEnvs() {
  return envs[rootUrl];
}

// if (envs[rootUrl]) {
//   window.env = envs[rootUrl];
// }
// else {
//   // Redirect to production if the rootUrl is unknown
//   window.location.replace(Object.keys(envs)[0]);
// }

export {
  getEnv,
  getEnvs,
};
