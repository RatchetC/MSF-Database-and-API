(function () {

  'use strict';

  var app = angular.module('eventsjs');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$rootScope', 'selectedEvent'];

  function control($rootScope, selectedEvent) {

    var vm = angular.extend(this, {
      event: {}
    });

    /**
     * Since the purpose of the app is to demostrate the resolve property and 
     * the use of promises, this project will not have any functionality to 
     * actually edit the event and post the edited event to the server using a
     * PUT request.
     * 
     * The resolve property in the state machine allows the dev to ensure that 
     * the controller for a state will have the data it needs before it is loaded
     */

    /**
     * the event variable in the view-model has to be set to equal the event, 
     * that was passed in as the selectedEvent parameter, which has to be the 
     * event that was selected to be edited, from the event list screen
     */
    vm.event = selectedEvent;

  }

})();
