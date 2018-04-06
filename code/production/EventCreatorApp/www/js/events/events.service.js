(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents', 'eventActivityMappingsSrvc'];

  function eventsSrvc($q, activityevents, eventActivityMappingsSrvc) {
    
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
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteEventsEventid(eventID, config).then(
        function success(response) {
          service.removeEvent(eventID);
          var cleanupPromiseArray = [];

          // delete mappings between events and activities.?
          // delete activities in question?
          cleanupPromiseArray.push(eventActivityMappingsSrvc.deleteActivitiesForThisEvent(eventID));

          // delete mappings between events and subjects?
          // delete subjects in question?
          cleanupPromiseArray.push(service.deleteSubjectsForThisEvent(eventID));

          // delete observations in question?
          cleanupPromiseArray.push(service.deleteObservationsForThisEvent(eventID));
          
        },
        function failure(error) {
          console.error(error);
        }
      );
      return promiseObj.promise;
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

    service.deleteSubject = function deleteSubject(subjectID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteSubjectsSubjectid(subjectID, config).then(
        function success(response) {
          promiseObj.resolve(subjectID);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };
    
    service.deleteEventSubjectMapping = function deleteEventSubjectMapping(mappingID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteEventSubjectMappingsEventSubjectMappingid(mappingID, config).then(
        function success(response) {
          promiseObj.resolve(response);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteSubjectsForThisEvent = function deleteSubjectsForThisEvent(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventSubjectMappings(config).then(
        function success(response) {
          var promisesArray = [];
          var deleteMappingsArray = [];
          var deleteSubjectsArray = [];
          var thisEventsSubjects = response.data;
          for (var i = 0; i < thisEventsSubjects.length; i++) {
            deleteMappingsArray.push(service.deleteEventSubjectMapping(thisEventsSubjects[i].id));
            deleteSubjectsArray.push(service.deleteSubject(thisEventsSubjects[i].subject));
          }
          promisesArray.push(deleteMappingsArray);
          promisesArray.push(deleteSubjectsArray);
          promiseObj.resolve($q.all(promisesArray));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteObservationsForThisEvent = function deleteObservationsForThisEvent(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getObservations(config).then(
        function success(response) {
          var promiseArray = [];
          var thisEventsObservations = response.data;
          config = {};
          for (var i = 0; i < thisEventsObservations.length; i++) {
            promiseArray.push(activityevents.deleteObservationsObservationid(thisEventsObservations[i].id, config));
          }
          promiseObj.resolve($q.all(promiseArray));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    return service;

  }

})();