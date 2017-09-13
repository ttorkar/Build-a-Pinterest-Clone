module.exports = function(app){
  var controller = app.controllers.users

  app.route('/api/user/:login')
    .get(controller.getUser)
  app.route('api/user/:login/images')
    .get(controller.getUserImages)

  app.route('/api/usr/')
    .get(controller.getUsr)
  app.route('/api/usr/images')
    .get(controller.getUsrImages)
}
