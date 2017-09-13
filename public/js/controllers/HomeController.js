angular.module('pinterest').controller('HomeController', function($scope,$resource){
  var Images = $resource('/api/images')

  Images.query(function(images) {
    $scope.images = images
  }, function(error) {
    console.log(error)
  })
})
