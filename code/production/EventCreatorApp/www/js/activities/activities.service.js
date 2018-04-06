(function () {

  'use strict';

  var app = angular.module('Activities');

  app.factory('activitiesSrvc', activitiesSrvc);

  activitiesSrvc.$inject = ['$q', 'activityevents'];

  function activitiesSrvc($q, activityevents) {
    
    var service = {};

    service.activities = [];

    service.getAllActivities = function getAllActivities() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getActivities(config).then(
        function success(response) {
          service.syncActivities(response.data);
          promiseObj.resolve(service.activities);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.getActivity = function getActivity(activityID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getActivitiesActivityid(activityID, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postActivity = function postActivity(activity) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postActivities(activity, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.addActivity = function addActivity(activity) {
      service.activities.push(activity);
    };

    service.syncActivities = function syncActivities(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.activities.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.activities.push(testitem);
        }
      }
    };

    service.getActivitiesForThisEvent = function getActivitiesForThisEvent(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      // get all event activity mappings for this event
      activityevents.getEventActivityMappings(config).then(
        function success(response) {
          var activityPromises = [];
          var mappingsArray = response.data;
          for (var i = 0; i < mappingsArray.length; i++) {
            // get each activity for this event
            activityPromises.push(service.getActivity(mappingsArray[i].activity));
          }
          promiseObj.resolve($q.all(activityPromises));
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