module.exports = function(app){
  var controller = app.controllers.images
  app.route('/api/images')
    .get(controller.getImages)
    .post(controller.addImage)

  app.route('/api/image/:id')
    .get(controller.getImage)
    .delete(controller.deleteImage)
}
