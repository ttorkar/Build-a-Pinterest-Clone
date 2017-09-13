module.exports = function(app){
  var Image = app.models.Image
  var controller = {}

  controller.getImages = function(req, res){
    Image.find().populate('author').sort({date:'descending'}).exec().then(function(images){
      res.json(images)
    }, function(error){
      res.status(500).json(error)
    })
  }

  controller.addImage = function(req, res){
    var Img = req.body
    Img.author = req.user._id

    Image.create(Img).then(function(image){
      res.status(201).json(image)
    }, function(error) {
      res.status(500).json(error)
    })
  }
  controller.getImage = function(req, res){
    var id = req.params.id

    Image.findById(id).populate('author').exec().then(function(image){
      res.json(image)
    }, function(error){
      res.status(404).json('Not Found')
    })
  }

  controller.deleteImage = function(req, res){
    var id = req.params.id

  Image.findByIdAndRemove(id).exec().then(
    function(){
      res.status(204).end()
    }, function(error) {
      res.status(500).json(error)
    }
  )
  }

  return controller
}
