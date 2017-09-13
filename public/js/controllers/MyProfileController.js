angular.module('pinterest').controller('MyProfileController',function($scope,$resource,$routeParams){
  var Images = $resource('/api/usr/images');
  var User = $resource('/api/usr/');
  var Image = $resource('/api/image/:id');
  $scope.message = {};
  User.get({},function (user) {
    $scope.user = user;
    getImages(user.login);
  },function (error) {
    console.log(error);
  });

  function getImages() {
    Images.query({},function (images) {
      $scope.images = images;
    },function (error) {
      console.log(error);
    });
  }

  $scope.removeImage = function(id){
    Image.remove({id:id},
     function(){
       $scope.message.delete = 'Image removed.';
     },function (erro) {
       $scope.message.error = 'Error, try again.';
       console.log(error);
     });
    getImages($scope.user.login);
  };
});
