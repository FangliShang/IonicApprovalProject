'use strict';

app.controller('ProjectCommentCtrl', function($scope, $stateParams,Project,$rootScope,$location) {
   $scope.comment={};
   $scope.project=Project.find($stateParams.projectId);
   $scope.addComment=function(){
      Project.addComment($stateParams.projectId,$scope.comment);
      $scope.comment='';
   };
});