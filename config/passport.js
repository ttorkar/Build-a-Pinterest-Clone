var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var mongoose = require('mongoose')

module.exports = function() {
  var User = mongoose.model('User')

  passport.use(new GoogleStrategy({
      clientID: '677052453853-afpg9g8nn5gu1atn3u66hh6jgl68btpm.apps.googleusercontent.com',
      clientSecret: 'eQoZmH2OAKF-uozcKg2qm1vc',
      callbackURL: "/auth/google/callback"
    }, function(token, tokenSecret, profile, done) {
    User.findOrCreate(
      {'login':profile.id},
      {'name':profile.displayName,
      'photo':profile._json['picture']},
      function(error,user) {
      if (error){
        console.error(error)
        return done(error)
      }
      return done(null, user)
    })
  }))


  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id).exec().then(function(user){
      done(null,user)
    })
  })
}
