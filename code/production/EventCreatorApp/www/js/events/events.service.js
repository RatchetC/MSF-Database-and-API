(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents'];

  function eventsSrvc($q, activityevents) {

    var service = {};

    service.getAllEvents = function () {

      var promiseObj = $q.defer();

      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          console.log('Successfully got all events. events : ', response.data);
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          console.error('Getting all events failed. error: ', error);
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.getEvent = function (eventID) {

      var promiseObj = $q.defer();

      var config = {};
      activityevents.getEventsEventid(eventID, config).then(
        function success(response) {
          console.log('Successfully got the requested event. The requested event:', response.data);
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          console.error('Getting the requested event failed. Error : ', error);
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    return service;

  }

})();