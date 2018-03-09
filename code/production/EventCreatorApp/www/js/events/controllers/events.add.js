(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    var vm = angular.extend(this, {
      title: "Add Event",
      btnSaveText: 'Save Event',
      event: {},
      noActivities: true
    });

    vm.save = function save() {
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

    vm.gotoActivityList = function gotoActivityList() {
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          $state.go('activity-list', { eventID: postedEvent.id });
        },
        function failure(error) {
          console.error(error);
        }
      );
    };
    
  }

})();