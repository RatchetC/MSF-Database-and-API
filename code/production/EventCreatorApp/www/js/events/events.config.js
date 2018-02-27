(function () {

  'use strict';

  var app = angular.module('Events');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('event-list', {
      cache: false,
      url: '/event-list',
      templateUrl: 'templates/event.list.html',
      controller: 'EventListCtrl as vm'
    });

    $stateProvider.state('event-edit', {
      cache: false,
      url: '/event-edit/:eventID',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventEditCtrl as vm',
      resolve: {
        selectedEvent: function (eventsSrvc, $stateParams) {
          return eventsSrvc.getEvent($stateParams.eventID);
        }
      }
    });

    $stateProvider.state('event-add', {
      cache: false,
      url: '/event-add',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventAddCtrl as vm'
    });

    $urlRouterProvider.otherwise('event-list');

  });

})();