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
  // "https://weboratory.herokuapp.com": {
  //   APP: "production",
  //   API_SERVER: "https://weboratory.herokuapp.com",
  //   AUTH_DOMAIN: "weboratory.auth0.com",
  // },

  // Development
  "http://localhost:3001": {
    APP: "development",
    // API_SERVER: "https://weboratory.herokuapp.com",
    API_SERVER: "http://localhost:3000",
    AUTH_DOMAIN: "weboratory.auth0.com",
  },
};

function getEnv(env: IEnv) {
  return envs[rootUrl][env];
}

export {
  getEnv,
};
