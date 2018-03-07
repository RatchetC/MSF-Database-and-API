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
        
        selectedEvent: function ($stateParams, eventsSrvc) {
          return eventsSrvc.getEvent($stateParams.eventID);
        },

        activities: function ($stateParams, activitiesSrvc) {
          return activitiesSrvc.getActivitiesForThisEvent($stateParams.eventID);
        },

        mappings: function ($stateParams, $q, activityevents) {
          var promiseObj = $q.defer();
          var config = { params: { event: $stateParams.eventID } };
          activityevents.getEventActivityMappings(config).then(
            function success(response) {
              promiseObj.resolve(response.data);
            },
            function failure(error) {
              promiseObj.reject(error);
            }
          );
          return promiseObj.promise;
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