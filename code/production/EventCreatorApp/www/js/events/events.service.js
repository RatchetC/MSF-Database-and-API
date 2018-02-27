(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents'];

  function eventsSrvc($q, activityevents) {

    var service = {};

    service.events = [];

    service.getAllEvents = function () {

      var promiseObj = $q.defer();

      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          service.addMissingEventsFrom(response.data);
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.addMissingEventsFrom = function addMissingEventsFrom(data){

      for(var testItemIndex in data) {
        var testitem = data[testItemIndex];
        console.log(testitem.id);
        var matchResult = service.events.reduce(function (matches, item) { return( (item.id === testitem.id) ? matches + 1 : matches); }, 0);
        console.warn(matchResult);
        if( matchResult===0 ) {
          service.events.push(testitem);
          console.log("++ events.service.addMissingEventsFrom - adding ", testitem.id);
        } else {
          console.log( "-  events.service.addMissingEventsFrom - skipping ",testitem.id );
        }
      }

    };

    service.postEvent = function (event) {

      var promiseObj = $q.defer();

      var config = {};
      activityevents.postEvents(event, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
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
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.putEvent = function (event) {
      // TODO: PUT changed event to api
    };

    service.deleteEvent = function (eventID) {

      // var promiseObj = $q.defer();

      // var config = {};
      // activityevents.deleteEventsEventid(eventID, config).then(
      //   function success(response) {
      //     promiseObj.resolve(response.data);
      //   },
      //   function failure(error) {

      //   }
      // );

      // return promiseObj.promise;

      activityevents.deleteEventsEventid(eventID, config).then(function (response) {
        console.log('Deleted event : ', eventID);
      });

    };

    service.addEvent = function addEvent(event) {
      service.events.push(event);
    };

    return service;

  }

})();