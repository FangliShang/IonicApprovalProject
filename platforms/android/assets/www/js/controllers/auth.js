'use strict';

app.controller('AuthCtrl',
	function($scope, $location, Auth, User,$rootScope){
		if($rootScope.signedIn()){
			$location.path('/tab/projects');
		}
		$scope.user={};

		$scope.login=function(){
			console.log($scope.user);
			Auth.login($scope.user).then(function(){
				$location.path('/tab/projects');
			},function(error){
				$scope.error=error.toString();
			});
		};

		$scope.register=function(){
			Auth.register($scope.user).then(function(authUser){
				User.create(authUser,$scope.user.username);
				Auth.login(authUser);
				$location.path('/tab/projects');
			},function(error){
				$scope.error=error.toString();
			});
		};
	});