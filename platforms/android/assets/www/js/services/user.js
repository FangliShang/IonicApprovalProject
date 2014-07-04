'use strict';

app.factory('User', function($firebase,FIREBASE_URL,Auth,$rootScope,$cordovaDialogs){
  var ref=new Firebase(FIREBASE_URL+'users');

  var users=$firebase(ref);

  var User={
    all:users,
    create:function(authUser, username){
      users[username]={
        md5_hash:authUser.md5_hash,
        username:username,
        checked:false,
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

    approve:function(projectId,username){
      users.$child(username).$child('approvals').$child(projectId).$set({projectId:projectId});
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
    var currentUserApprovalsRef=ref.child(username).child('approvals');
      currentUserApprovalsRef.on('value',function(){
        //$window.alert('xixi');
        $cordovaDialogs.beep(1);
        $cordovaDialogs.alert('You have a new project to approve!');
         //console.log('xixi'); 
      }); 

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

  $rootScope.logout=function(){
      return Auth.logout();
  };

  return User;
});