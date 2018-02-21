(function () {

  'use strict';

  var app = angular.module('eventsjs');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('event-list', {
      cache: false,
      url: '/event-list',
      templateUrl: 'templates/event.list.html',
      controller: 'EventsListCtrl as vm',
    });

    $stateProvider.state('event-edit', {
      cache: false,
      url: '/event-edit/:eventID',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventEditCtrl as vm',
      resolve: {
        selectedEvent: function (eventsSrvc, $stateParams) {
          return eventsSrvc.retrieveEvent($stateParams.eventID);
        }
      }
    });

    $urlRouterProvider.otherwise('event-list');

  });
  
})();
