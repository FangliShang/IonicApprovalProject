'use strict';

app.factory('Project', function($firebase,FIREBASE_URL,User) {
  var ref = new Firebase(FIREBASE_URL+'projects');

  var projects=$firebase(ref);

  var Project={
    all:projects,
    create:function(project){
      //if (User.signedIn()){
        var user=User.getCurrent();
        project.state="waitForApproval";
        return projects.$add(project).then(function(ref){
          var projectId=ref.name();
          //projects.$child(projectId).$child('members').$add(user.username);
          return projectId;
        });
      //}
    },
    update:function(projectId,project){
      if(User.signedIn()){
         projects.$child(projectId).$set(project);      
      }
    },
    changeState:function(projectId,state){
      if (User.signedIn()) {
        projects.$child(projectId).$child('state').$set(state);
      }
    },
    approvalsOfProject:function(projectId){
      return projects.$child(projectId).$child('approvals');
    },
    find:function(projectId){
      return projects.$child(projectId);
    },
    approve:function(projectId,username){
      if (User.signedIn()) {
        var project=Project.find(projectId);
        project.$on('loaded',function(){
          project.$child('approvals').$child(username).$set({username:username,approved:"wait"});
        });
      }
    },
    delete:function(projectId){
      if(User.signedIn()){
        var project=Project.find(projectId);

        project.$on('loaded',function(){
         
            projects.$remove(projectId);
         
        });

      }
    },
    addComment:function(projectId,comment){
      if(User.signedIn()){
        var user=User.getCurrent();

        comment.username=user.username;
        comment.projectId=projectId;

        projects.$child(projectId).$child('comments').$add(comment).then(function(ref){
          user.$child('comments').$child(ref.name()).$set({id:ref.name(),projectId:projectId});
        });
      }
    },
    deleteComment:function(project,comment,commentId){
      if (User.signedIn()) {
        var user=User.findByUsername(comment.username);

        project.$child('comments').$remove(commentId).then(function(){
          user.$child('comments').$remove(commentId);
        });
      }
    },
    deleteApproval:function(projectId,approvalId){
      if (User.signedIn()) {           
          projects.$child(projectId).$child('approvals').$remove(approvalId);       
      }
    }

  };

  return Project;
});