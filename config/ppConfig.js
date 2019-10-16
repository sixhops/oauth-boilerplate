const passport = require('passport');
const passportGithub2 = require('passport-github2');
const GithubStrategy = passportGithub2.Strategy;
const db = require('../models');

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  console.log("Hitting the strategy...")
  db.user.findOrCreate({
    where: {githubId: profile.id}
  }).spread((user, created) => {
    let tempUser = {...user.dataValues, accessToken};
    return cb(null, tempUser);
  })
}))

passport.serializeUser((user, cb) => {
  console.log("Hitting serializeUser...")
  // console.log("User in serializeUser:", user)
  // let retUser = {
  //   id: user.id,
  //   githubId: user.githubId,
  //   accessToken: user.accessToken
  // }
  cb(null, user)
});

passport.deserializeUser((obj, cb) => {
  console.log("Hitting deserializeUser...")
  // db.user.findByPk(obj.id).then(user => {
  //   cb(null, user)
  // })
  cb(null, obj);
})

module.exports = passport;
