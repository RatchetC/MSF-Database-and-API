(function () {

  'use strict';

  var app = angular.module('eventsjs');

  // the controller function creates a controller
  app.controller('EventsListCtrl', control);

  // see event.service.js
  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    // vm -> https://johnpapa.net/angularjss-controller-as-and-the-vm-variable/
    // angular.extend -> https://moduscreate.com/blog/angularjs-tricks-with-angular-extend/
    var vm = angular.extend(this, { events: [] });

    // gets all events when the controller loads
    // the view displays all events in a list
    function init() {
      // uses the event service to get all events
      eventsSrvc.retrieveAllEvents().then(
        function success(data) { // sucess callback
          // set the view-model's events variable equal to the data (which is an array of event objects)
          vm.events = data;
        },
        function failure(error) { // failure callback
          // handle the error
          console.error(error);
        }
      );
    }

    // call the init function after it is declared to run it every time the controller loads
    // this controller is reloaded every time the app navigates to the event-list state as caching is turned off
    // otherwise any edits made to the event will not be saved
    init();

    // this function tells the app to move to the event-edit state and passes in the eventID parameter that it expects
    vm.editEvent = function (eventID) {
      $state.go('event-edit', { eventID: eventID });
    };

  }

})();
