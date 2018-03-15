(function () {

  'use strict';

  var app = angular.module('Activities');

  app.factory('activitiesSrvc', activitiesSrvc);

  activitiesSrvc.$inject = ['$q', 'activityevents'];

  function activitiesSrvc($q, activityevents) {
    
    var service = {};

    service.activities = [];

    /*
      CRUD methods needed
               getAllActivities()         -> GET    request to /events/
      CREATE   postActivity(activity)     -> POST   request to /events/
      RETRIEVE getActivity(activityID)    -> GET    request to /events/{{eventID}}
      UPDATE   putactivity(activity)      -> PUT    request to /events/{{eventID}}
      DELETE   deleteActivity(activityID) -> DELETE request to /events/{{eventID}}

      CRUD methods for local store of activities
               fetchAllActivities()
      CREATE   addActivity(activity)
      RETRIEVE fetchActivity(activityID)
      UPDATE   updateActivity(activity)
      DELETE   removeActivity(activityID)

      REMEMBER!!! DON'T DESTROY BINDINGS BY FORCING VALUES TO CHANGE!!! E.g. (service.activities = data;) USE AN API!!! E.g. (service.syncActivities(data);)
    */

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

    service.putActivity = function putActivity(activity) {

      var promiseObj = $q.defer();

      var config = {};
      activityevents.putActivitiesActivityid(activity.id, activity, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.deleteActivity = function deleteActivity(activityID) {

      var config = {};
      activityevents.deleteActivitiesActivityid(activityID, config).then(
        function success(response) {
          service.removeActivity(activityID);
        },
        function failure(error) {
          console.error(error);
        }
      );

    };

    service.fetchAllActivities = function fetchAllActivities() {
      return service.activites;
    };

    service.addActivity = function addActivity(activity) {
      service.activities.push(activity);
    };

    service.fetchActivity = function fetchActivity(activityID) {

      for (var i = 0; i < service.activities.length; i++) {
        if (service.activities[i].id === activityID) {
          return service.activities[i];
        }
      }

    };

    service.updateActivity = function updateActivity(activity) {

      for (var i = 0; i < service.activities.length; i++) {
        if (service.activities[i].id === activity.id) {
          service.activities[i] = activity;
        }
      }

    };

    service.removeActivity = function removeActivity(activityID) {

      for (var i = 0; i < service.activities.length; i++) {
        if (service.activities[i].id === activityID) {
          service.activities.splice(i, 1);
        }
      }

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
      var resolvePromise = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventActivityMappings(config).then(
        function success(response) {
          var promises = [];
          var mappingsArray = response.data;
          for (var i = 0; i < mappingsArray.length; i++) {
            promises.push(service.getActivity(mappingsArray[i].activity));
          }
          resolvePromise.resolve($q.all(promises));
        },
        function failure(error) {
          resolvePromise.reject(error);
        }
      );
      return resolvePromise.promise;
    };

    return service;

  }

})();