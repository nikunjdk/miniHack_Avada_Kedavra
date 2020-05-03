var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../models/user");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "246655168842-ljbmk6h1ha81tid6v1lcusq23ie2566q.apps.googleusercontent.com",
  clientSecret: "vay0-geAGBSK4-YjLoJMpu4b",
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback   : true
},
  function (req, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id, name: profile.displayName, photo: profile.photos[0].value}, function (err, user) {
      return done(err, user);
    });
  }
));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read', 'profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/dashboard' }),
  function (req, res) {
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/about', function(req, res){
  res.render('about');
});
/* GET home page. */
router.get('/', function (req, res) {
  res.render('landing');
});

router.get('/dashboard', function (req, res) {
  res.render('dashboard', {currentUser: req.user});
});

module.exports = router;