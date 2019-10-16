const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/repos', (req, res) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${req.user.accessToken}`,
      'User-Agent': 'stp-oauth-boilerplate'
    }
  }
  axios.get('https://api.github.com/user/repos', config)
    .then((response) => {
      res.render('repos', {repos: response.data})
    }).catch((err) => {
      console.log("Error from axios:", err);
    })
})

module.exports = router;