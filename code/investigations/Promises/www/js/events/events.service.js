(function () {

  'use strict';

  // see event.config.js file if you haven't checked it already
  var app = angular.module('eventsjs');

  // the factory function creates a service
  app.factory('eventsSrvc', eventsSrvc);

  // The $inject property injects the services that the eventsSrvc function expects
  eventsSrvc.$inject = ['$q', 'activityevents'];

  // eventsSrvc function
  function eventsSrvc($q, activityevents) {

    // this object will contain all the functions that the service will provide
    var service = {};

    // function that returns a promise to get all the events
    service.retrieveAllEvents = function () {

      // create the object that will allow us to defer (or delay) a result until a later time
      var defer = $q.defer();

      // the config object is the only parameter expected by the getEvents method of the activityevents service
     /**
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     *{
     *  "date" : "Allows to filter the collections of result by the value of field date",
     *  "$page" : "Number of the page to retrieve. Integer value.",
     *  "postcode" : "Allows to filter the collections of result by the value of field postcode",
     *  "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
     *  "name" : "Allows to filter the collections of result by the value of field name",
     *  "id" : "Allows to filter the collections of result by the value of field id",
     *  "$size" : "Size of the page to retrieve. Integer value"
     *}
     */
      var config = {};

      // sends a GET request to https://activityevents.restlet.net/v1/events/
      // returns a HttpPromise that has a then() function which takes 2 callback functions
      // one success callback and one failure callback
      activityevents.getEvents(config).then(

        function success(response) {
          console.log("Successfully got all events. events: ", response.data);
          // puts the response data into the defer object
          defer.resolve(response.data);
        },

        function failure(error) {
          console.error("Getting all events failed : ", err);
          // puts the error into the defer object
          defer.reject(error);
        }
      );

      // return the promise
      return defer.promise;
    };

    service.retrieveEvent = function (eventID) {

      var defer = $q.defer();

      var config = {};

      activityevents.getEventsEventid(eventID, config).then(

        function success(response) {
          console.log(response.data);
          defer.resolve(response.data);
        },

        function failure(error) {
          console.error("Getting the event to edit failed. Error : ", error);
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    // return the service
    return service;

  }

})();
