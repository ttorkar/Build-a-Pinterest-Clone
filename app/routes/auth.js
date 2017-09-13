var passport = require('passport')

module.exports = function(app){
  app.get('/login', function(req, res) {
    res.render('login',{'userLogged':false})
  })

  app.get('/auth/google', passport.authenticate('google',{scope:'profile'}))
  app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/login'
  })
  )

  app.get('/logout', function(req, res){
    req.logOut()
    res.redirect('/')
  })
}
