angular.module('pinterest').controller('AddImageController',function($scope,$resource){
  var Image = $resource('/api/images')
  $scope.image = new Image()
  $scope.message = {
    success: '',
    error:''
  }

  $scope.save = function() {
    $scope.image.$save().then(
      function(){
        $scope.message.success = 'Image Added'
        $scope.message.error = ''
        $scope.image = new Image()
      }
    )
    .catch(
      function(error){
        if (error.statusText === "Unauthorized") {
          $scope.message.error = 'You must be logged'
        } else {
          $scope.message.error = 'Could not add the image'
        }
        $scope.message.success = ''
      }
    )
  }
})
