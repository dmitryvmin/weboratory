/**
 * Required External Modules
 */
import * as passport from "koa-passport";
import * as Router from "koa-router";
import * as HttpStatus from "http-status";
import { Context } from "koa";

const util = require("util");
const url = require("url");
const querystring = require("querystring");

function useAuthRouter(router: Router) {

  router.get(
    "/login",
    passport.authenticate("auth0", {
      scope: "openid email profile",
    }),
    (ctx: Context, next: () => Promise<any>) => {
      ctx.redirect("/");
    },
  );

  // router.get('/callback', (ctx, next) => {
  //   passport.authenticate('auth0', function (err, user, info) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) { return res.redirect('/login'); }
  //     req.logIn(user, function (err) {
  //       if (err) { return next(err); }
  //       const returnTo = req.session.returnTo;
  //       delete req.session.returnTo;
  //       res.redirect(returnTo || '/user');
  //     });
  //   })(req, res, next);
  // });

}

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = { id: 1, username: 'test', password: 'test' }
  return async function() {
    return user
  }
})()

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser()
    done(null, user)
  } catch(err) {
    done(err)
  }
})

// const LocalStrategy = require('passport-local').Strategy
// passport.use(new LocalStrategy(function(username, password, done) {
//   fetchUser()
//     .then(user => {
//       if (username === user.username && password === user.password) {
//         done(null, user)
//       } else {
//         done(null, false)
//       }
//     })
//     .catch(err => done(err))
// }))
//
// const FacebookStrategy = require('passport-facebook').Strategy
// passport.use(new FacebookStrategy({
//     clientID: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))
//
// const TwitterStrategy = require('passport-twitter').Strategy
// passport.use(new TwitterStrategy({
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))
//
// const GoogleStrategy = require('passport-google-auth').Strategy
// passport.use(new GoogleStrategy({
//     clientId: 'your-client-id',
//     clientSecret: 'your-secret',
//     callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // retrieve user ...
//     fetchUser().then(user => done(null, user))
//   }
// ))

export { useAuthRouter };
