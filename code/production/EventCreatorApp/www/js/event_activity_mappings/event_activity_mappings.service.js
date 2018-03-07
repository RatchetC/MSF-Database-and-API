(function () {

  'use strict';

  var app = angular.module('EventActivityMappings');

  app.factory('eventActivityMappingsSrvc', eventActivityMappingsSrvc);

  eventActivityMappingsSrvc.$inject = ['$q', 'activityevents'];

  function eventActivityMappingsSrvc($q, activityevents) {

    var service = {};

    service.mappings = [];

    // GET POST DELETE

    service.getAllEventActivityMappings = function getAllEventActivityMappings() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEventActivityMappings(config).then(
        function success(response) {
          service.syncEventActivityMappings(response.data);
          promiseObj.resolve(service.mappings);
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
          service.removeEventActivityMapping(mappingID);
        },
        function failure(error) {
          console.error(error);
        }
      );

    };

    service.fetchAllEventActivityMappings = function fetchAllEventActivityMappings() {
      return service.mappings;
    };

    service.addEventActivityMapping = function addEventActivityMapping(mapping) {
      service.mappings.push(mapping);
    };

    service.removeEventActivityMapping = function removeEventActivityMapping(mappingID) {
      for (var i = 0; i < service.mappings.length; i++) {
        if (service.mappings[i].id === mappingID) {
          service.mappings.splice(i, 1);
        }
      }
    };

    service.syncEventActivityMappings = function syncEventActivityMappings(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.mappings.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.mappings.push(testitem);
        } else { }
      }
    };

    return service;

  }

})();