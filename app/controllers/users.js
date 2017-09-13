module.exports = function(app){
  var User = app.models.User
  var Image = app.models.Image
  var controller = {}

  controller.getUser = function(req, res){
    var login = req.params.login

    User.findOne({'login':login}, {'_id':0,'__v':0}).exec().then(function(user){
      if (!user){
        throw new Error("User doesn't exist")
      }
      res.json(user)
    }, function(error){
      res.status(404).json('Not Found')
    })
  }

  controller.getUserImages = function(req, res) {
    var login = req.params.login
    User.findOne({'login':login}).exec().then(function(user){
      if (!user){
        throw new Error("User doesn't exist")
      }
      Image.find({'author':user._id}, {'_id':0,'__v':0}).populate('author').sort({date:'descending'}).exec().then(function(images){
        if (!images){
          throw new Error('No Images Found')
        }
        res.json(images)
      }, function(error){
        res.status(404).json('Not Found')
      })
    }, function(error){
      res.status(404).json('Not Found')
    })
  }

  controller.getUsr = function(req, res) {
    var login = req.user.login

    User.findOne({'login':login}, {'_id':0,'__v':0}).exec().then(function(user){
      if (!user){
        throw new Error('Not Found')
      }
      res.json(user)
    }, function(error){
      res.status(404).json('Not Found')
    })
  }

  controller.getUsrImages = function(req, res) {
    var login = req.user.login
    User.findOne({'login':login}).exec().then(function(user){
      if (!user){
        throw new Error('Not Found')
      }
      Image.find({'author':user._id}, {'__v': 0}).populate('author').sort({date:'descending'}).exec().then(function(images){
        if (!images){
          throw new Error('Not Found')
        }
        res.json(images)
      }, function(error){
        res.status(404).json('Not Found')
      })
    }, function(error){
      res.status(404).json('Not Found')
    })
  }
  return controller
}
