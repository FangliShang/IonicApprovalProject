'use strict';

app.controller('ProjectIndexCtrl', function($scope, Project,Auth,$location,$rootScope) {
  if($rootScope.signedIn()==false){
  	$location.path('/tab/login');
  }
  $scope.projects = Project.all;

  $scope.projectsToApprove=function(project){
  	var toApprove=false;
    if($rootScope.signedIn()){
    	var ausername=$rootScope.currentUser.username;

    	if(project.approvals[ausername] && project.approvals[ausername].approved=="wait"){
    		toApprove=true;
    	}
    }
  	return toApprove;
  };
});