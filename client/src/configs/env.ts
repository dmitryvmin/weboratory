const rootUrl = `${window.location.protocol}//${window.location.host}`;

type PublicEnv =
  | "APP"
  | "API_SERVER"
  | "AUTH_DOMAIN"
  | "GRAPHQL_SERVER"
  ;

const publicEnvs = {
  // Production
  "https://weboratory.herokuapp.com": {
    APP: "production",
    API_SERVER: "https://weboratory.herokuapp.com",
    AUTH_DOMAIN: "weboratory.auth0.com",
    GRAPHQL_SERVER: "http://localhost:3000/graphql",
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
    API_SERVER: "https://weboratory.herokuapp.com",
    // API_SERVER: "http://localhost:3000",
    AUTH_DOMAIN: "weboratory.auth0.com",
    GRAPHQL_SERVER: "http://localhost:3000/graphql",
  },
};

function getEnv(env: PublicEnv) {
  return publicEnvs[rootUrl][env];
}

export {
  publicEnvs,
  getEnv,
};
