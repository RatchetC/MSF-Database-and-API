(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents'];

  function eventsSrvc($q, activityevents) {
    
    var service = {};
  
    service.events = [];

    service.getAllEvents = function getAllEvents() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          service.syncEvents(response.data);
          promiseObj.resolve(service.events);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postEvent = function postEvent(event) {
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

    service.getEvent = function getEvent(eventID) {
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

    service.putEvent = function putEvent(event) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.putEventsEventid(event.id, event, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteEvent = function deleteEvent(eventID) {
      var config = {};
      activityevents.deleteEventsEventid(eventID, config).then(
        function success(response) {
          service.removeEvent(eventID);
        },
        function failure(error) {
          console.error(error);
        }
      );
    };
    
    service.fetchEvent = function fetchEvent(eventID) {      
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === eventID) {
          return service.events[i];
        }
      }
    };

    service.addEvent = function addEvent(event) {
      service.events.push(event);
    };

    service.updateEvent = function updateEvent(event) {
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === event.id) {
          service.events[i] = event;
        }
      }
    };

    service.removeEvent = function removeEvent(eventID) {
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === eventID) {
          service.events.splice(i, 1);
        }
      }
    };

    service.syncEvents = function syncEvents(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.events.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.events.push(testitem);
        } else { }
      }
    };

    return service;

  }

})();