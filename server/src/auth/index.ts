// Libs
import * as Koa from "koa";
import * as Router from "koa-router";
import * as koaSession from "koa-session";
import * as passport from "koa-passport";
// import * as Auth0Strategy from "passport-auth0";

// App
import { config } from "../config";

// Constants
const { isProduction } = config.serverConfig;

/**
 * Auth Middleware
 */
function initAuth(app: Koa, router: Router) {

  /**
   * Session Configuration
   */
  const CONFIG = {
    key: "koa.sess", /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false,
    /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  };

  if (isProduction) {
    // Serve secure cookies, requires HTTPS
    CONFIG.secure = true;
  }

  /**
   * Passport Configuration
   */
  // const strategy = new Auth0Strategy(
  //   {
  //     domain: process.env.AUTH0_DOMAIN,
  //     clientID: process.env.AUTH0_CLIENT_ID,
  //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //     callbackURL:
  //       process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback",
  //   },
  //   function(accessToken, refreshToken, extraParams, profile, done) {
  //     /**
  //      * Access tokens are used to authorize users to an API
  //      * (resource server)
  //      * accessToken is the token to call the Auth0 API
  //      * or a secured third-party API
  //      * extraParams.id_token has the JSON Web Token
  //      * profile has all the information from the user
  //      */
  //     return done(null, profile);
  //   },
  // );

  /**
   *  App Configuration
   */
  app.use(koaSession(CONFIG, app));

  // passport.use(strategy);

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}

export { initAuth };
