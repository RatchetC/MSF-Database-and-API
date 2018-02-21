(function () {

  'use strict';

  var app = angular.module('eventsjs');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents'];

  function eventsSrvc($q, activityevents) {
    
    var events = [];

    var service = {};

    service.retrieveAllEvents = function () {

      var defer = $q.defer();

      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          events = response.data;
          defer.resolve(response.data);
        },
        function failure(error) {
          console.log("Buggered getting all events : ", err);
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    service.retrieveEvent = function (eventID) {
      console.log("running eventsSrvc.retrieveEvent function. eventID : ", eventID);
      var defer = $q.defer();
      var config = {};
      activityevents.getEventsEventid(eventID, config).then(
        function success(response) {
          console.log(response.data);
          defer.resolve(response.data);
        },
        function failure(error) {
          console.warn("Buggered getting the event to edit. Error : ", error);
          defer.reject(error);
        }
      );
      return defer.promise;
    };

    return service;

  }

})();
