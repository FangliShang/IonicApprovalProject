angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('ProjectCtrl', function($scope, ProjectService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.projects = ProjectService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
