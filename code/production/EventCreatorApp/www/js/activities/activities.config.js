(function () {

  'use strict';

  var app = angular.module('Activities');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('activity-list', {
      cache: false,
      url: '/activity-list',
      templateUrl: 'templates/activity.list.html',
      controller: 'ActivityListCtrl as vm'
    });

    $stateProvider.state('activity-edit', {
      cache: false,
      url: '/activity-edit:activityID',
      templateUrl: 'templates/activity.edit.html',
      controller: 'ActivityEditCtrl as vm'
    });

    $stateProvider.state('activity-add', {
      cache: false,
      url: '/activity-add',
      templateUrl: 'templates/activity.edit.html',
      controller: 'ActivityAddCtrl as vm'
    });

    $urlRouterProvider.otherwise('event-list');

  });

})();