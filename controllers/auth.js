const express = require('express');
const router = express.Router();
// const db = require('../models');
const passport = require('../config/ppConfig');

// Displays the Github login form
router.get('/github', passport.authenticate('github'));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
