const rootUrl = `${window.location.protocol}//${window.location.host}`;

type IEnv = "APP" | "API_SERVER" | "AUTH_DOMAIN";

const envs = {
  // Production
  "https://weboratory.herokuapp.com": {
    APP: "production",
    API_SERVER: "https://weboratory.herokuapp.com",
    AUTH_DOMAIN: "weboratory.auth0.com",
  },

  // Staging
  // "https://weboratory.herokuapp.com/": {
  //   APP: "staging",
  //   API_SERVER: "http://localhost:3001/api/v1",
  // },

  // Development
  "http://localhost:3001": {
    APP: "development",
    API_SERVER: "http://localhost:3001",
    // API_SERVER: "https://weboratory.herokuapp.com",
    AUTH_DOMAIN: "weboratory.auth0.com",
  },
};

function getEnv(env: IEnv) {
  return envs[rootUrl][env];
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
};
