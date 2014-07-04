'use strict';

app.controller('ProjectDetailCtrl', function($scope, $stateParams,Project,$rootScope,$location,$cordovaDialogs) {
   $scope.project = Project.find($stateParams.projectId);

   $scope.gotocomment=function(){
       $location.path('tab/project/'+$stateParams.projectId+'/comment');
      
   };
   //$scope.approvals=Project.approvalsOfProject($stateParams.projectId);
   $scope.approve=function(){
   		if($rootScope.currentUser){
   			angular.forEach($scope.project.approvals,function(approval){
   				if(approval.username==$rootScope.currentUser.username){
   					approval.approved="true";
   				}
   			});
   			Project.update($stateParams.projectId,$scope.project);
            $location.path('tab/projects'); 
   		}
   };

   $scope.reject=function(){
      if($rootScope.currentUser){
         //console.log("comment");
         $cordovaDialogs.alert('Please leave a comment!');
         angular.forEach($scope.project.approvals,function(approval){
            if(approval.username==$rootScope.currentUser.username){
               approval.approved="false";
            }
         });
         Project.update($stateParams.projectId,$scope.project);
         $location.path('tab/project/'+$stateParams.projectId+'/comment');
      }
   };
});