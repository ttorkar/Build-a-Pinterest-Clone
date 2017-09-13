var mongoose = require('mongoose')
module.exports = function(){
  var schema = mongoose.Schema({
    image_url:{
      type:String,
      required:true
    },
    title:String,
    description:String,
    pins:[mongoose.Schema.ObjectId],
    author: {
      type:mongoose.Schema.ObjectId,
      ref: 'User'
    },
    date: {
      type:Date,
      default:Date.now
    }
  })

  return mongoose.model('Image',schema)
}
