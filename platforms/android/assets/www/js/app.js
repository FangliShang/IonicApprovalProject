/*global app:true*/
'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app=angular.module('starter', ['ionic', 'firebase','ngCordova']);


app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.project-index', {
      url: '/projects',
      views: {
        'projects-tab': {
          templateUrl: 'templates/project-index.html',
          controller: 'ProjectIndexCtrl'
        }
      }
    })

    .state('tab.project-detail', {
      url: '/project/:projectId',
      views: {
        'projects-tab': {
          templateUrl: 'templates/project-detail.html',
          controller: 'ProjectDetailCtrl'
        }
      }
    })

    .state('tab.project-comment',{
      url:'/project/:projectId/comment',
      views:{
        'projects-tab':{
          templateUrl:'templates/project-comment.html',
          controller:'ProjectCommentCtrl'
        }
      }
    })

    .state('tab.create', {
      url: '/create',
      views: {
        'create-tab': {
          templateUrl: 'templates/create.html',
          controller: 'CreateCtrl'
        }
      }
    })

    .state('tab.login', {
      url: '/login',
      views: {
        'login-tab': {
          templateUrl: 'templates/login.html',
          controller: 'AuthCtrl'
        }
      }
    })

    .state('tab.register', {
      url: '/register',
      views: {
        'register-tab': {
          templateUrl: 'templates/register.html',
          controller: 'AuthCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/projects');

})
.constant('FIREBASE_URL','https://toprove.firebaseio.com/');

