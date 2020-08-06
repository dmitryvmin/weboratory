import request from "request";

// https://auth0.com/docs/api-auth/tutorials/authorization-code-grant

// 1. Get the User's Authorization

const AUTH_URL = "https://weboratory.auth0.com/authorize?audience=YOUR_API_AUDIENCE&scope=YOUR_SCOPE&response_type=code&client_id=v2VPCX9EtK715DYDalHZXblOGd3r_GiS&redirect_uri=https://YOUR_APP/callback&state=YOUR_OPAQUE_VALUE";

// 2. Exchange the Authorization Code for an Access Token

const options1 = {
  method: 'POST',
  url: 'https://weboratory.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'authorization_code',
    client_id: 'v2VPCX9EtK715DYDalHZXblOGd3r_GiS',
    client_secret: 'YOUR_CLIENT_SECRET',
    code: 'YOUR_AUTHORIZATION_CODE',
    redirect_uri: 'https://YOUR_APP/callback'
  }
};

request(options1, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});

// 3. Call the API

const options2 = {
  method: 'GET',
  url: 'https://someapi.com/api',
  headers: {'content-type': 'application/json', authorization: 'Bearer ACCESS_TOKEN'}
};

request(options2, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// 4. Verify the Token
// https://auth0.com/docs/tokens/guides/validate-access-tokens