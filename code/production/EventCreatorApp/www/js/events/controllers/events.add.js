(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    var vm = angular.extend(this, {
      title: "Add Event",
      event: {},
      hideActivityList: true
    });

    vm.save = function save() {
      /*
        TODO: Change the functionality of the |+ Add Activity| button in the 
        add screen (after making the button itself as well the list and labels 
        visible again). Change it so that it will POST the event and wait for 
        the reponse with the eventID and when it gets the eventID it should 
        then move onto the activity-list state having passed it the event ID 
        which it got from the response. This will allow the full view to be 
        utilized and by both the edit AND the add controllers whilst 
        simultaneously getting rid of any hacky ways of hiding parts of the 
        template and the question of whether to create separate views for both 
        controllers to simplify things.
      */
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          $state.go('event-list');
        },
        function failure(error) {
          console.error(error);
        }
      );
    };
    
  }

})();