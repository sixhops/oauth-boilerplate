require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');

const app = express();

app.use(express.static("static"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(layouts);
app.set('view engine', 'ejs');

// Configure the express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log("About to res.render index...")
  res.render('index');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github');
}

app.use('/auth', require('./controllers/auth'));
app.use('/api', require('./controllers/api'));

app.listen(process.env.PORT || 3000, () => {
  console.log("You're listening to the sweet sounds of port " + process.env.PORT)
});
