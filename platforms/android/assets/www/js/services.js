angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Project', function($firebase,FIREBASE_URL,User) {
  var ref = new Firebase(FIREBASE_URL+'projects');

  var projects=$firebase(ref);

  var Project={
    all:projects,
    create:function(project){
      if (User.signedIn()){
        var user=User.getCurrent();
        project.state="waitForApproval";
        return projects.$add(project).then(function(ref){
          var projectId=ref.name();
          //projects.$child(projectId).$child('members').$add(user.username);
          return projectId;
        });
      }
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
    addApproval:function(projectId,username){
      if(User.signedIn()){
        var approval.username=username;
        approval.approved=false;     
        projects.$child(projectId).$child('approvals').$add(approval);                               
      }
    },
    deleteApproval:function(projectId,approvalId){
      if (User.signedIn()) {           
          projects.$child(projectId).$child('approvals').$remove(approvalId);       
      }
    }

  };

  return Project;
})

.factory('Auth',
  function($firebaseSimpleLogin,FIREBASE_URL,$rootScope){
    var ref=new Firebase(FIREBASE_URL);

    var auth=$firebaseSimpleLogin(ref);

    var Auth={
      register:function(user){
        return auth.$createUser(user.email, user.password);
      },
      signedIn:function(){
        return auth.user !== null;
      },
      login:function(user){
        return auth.$login('password',user);
      },
      logout:function(){
        auth.$logout();
      }
    };
    return Auth;
  })

.factory('User', function($firebase,FIREBASE_URL,Auth,$rootScope){
  var ref=new Firebase(FIREBASE_URL+'users');

  var users=$firebase(ref);

  var User={
    all:users,
    create:function(authUser, username){
      users[username]={
        md5_hash:authUser.md5_hash,
        username:username,
        $priority:authUser.uid
      };

      users.$save(username).then(function(){
        setCurrentUser(username);
      });
    },

    findByUsername:function(username){
      if(username){
        return users.$child(username);
      }
    },

    getCurrent:function(){
      return $rootScope.currentUser;
    },

    signedIn:function(){
      return $rootScope.currentUser !== undefined;
    }
  };

  function setCurrentUser(username){
    $rootScope.currentUser=User.findByUsername(username);
  }

  $rootScope.$on('$firebaseSimpleLogin:login',function(e,authUser){
    var query=$firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

    query.$on('loaded', function(){
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout',function(){
    delete $rootScope.currentUser;
  });


  $rootScope.signedIn=function(){
      return User.signedIn();
  };

  return User;
});
