'use strict';

app.controller('CreateCtrl',function($scope,$location, Project, Auth,User,$rootScope,$cordovaDialogs,$window){
	if($rootScope.signedIn()==false){
		$location.path('/tab/login');
	}
	$scope.project={};
	$scope.users=User.all;
	$scope.submitProject=function(){
		Project.create($scope.project).then(function(projectId){
			angular.forEach($scope.users,function(user){
				if(user.checked){
					Project.approve(projectId,user.username);
					User.approve(projectId,user.username);
					user.checked=false;
				}
			});
			$scope.project={};
			$location.path('tab/project/'+projectId);			
		});
	};

	$scope.logout=function(){
		Auth.logout();
	};
});