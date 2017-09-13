var mongoose = require('mongoose')
module.exports = function(uri) {
  mongoose.connect(uri)
  mongoose.set('debug', true)

  mongoose.connection.on('connected', function(){
    console.log('Connected on '+uri)
  })

  mongoose.connection.on('disconnect', function(){
    console.log('Disconnected from '+uri)
  })

  mongoose.connection.on('error', function(error){
    console.log('Error: '+error)
  })

  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log('Terminated')
      process.exit(0)
    })
  })
}
