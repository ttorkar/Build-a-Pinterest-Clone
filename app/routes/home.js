module.exports = function(app){
  app.get('/', function(req, res){
    var userLogged = false
    var userLogin = ''
    var name = ''
    var photoUrl = ''

    if (req.user){
      userLogged = true
      userLogin = req.user.login
      name = req.user.name
      photoUrl = req.user.photo

      res.render('home', {
        'userLogged':userLogged,
        'userLogin': userLogin,
        'userName': name,
        'userImg': photoUrl
      });
    } else {
      res.render('index',{'userLogged':userLogged})
    }
  })
}
