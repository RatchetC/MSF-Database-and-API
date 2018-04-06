(function () {

  'use strict';

  var app = angular.module('EventActivityMappings');

  app.factory('eventActivityMappingsSrvc', eventActivityMappingsSrvc);

  eventActivityMappingsSrvc.$inject = ['$q', 'activityevents'];

  function eventActivityMappingsSrvc($q, activityevents) {

    var service = {};

    service.getEventActivityMappings = function getEventActivityMappings(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventActivityMappings(config).then(
        function succes(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postEventActivityMapping = function postEventActivityMapping(mapping) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postEventActivityMappings(mapping, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteEventActivityMapping = function deleteEventActivityMapping(mappingID) {
      var config = {};
      activityevents.deleteEventActivityMappingsEventActivityMappingid(mappingID, config).then(
        function success(response) {
          // There is no response message/data
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    return service;

  }

})();
