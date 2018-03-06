(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    var vm = angular.extend(this, { 
      event: {},
      activities: [],
      noActivities: true
    });

    vm.save = function save() {
      eventsSrvc.postEvent(vm.event).then(
        function success(data) {
          eventsSrvc.addEvent(data);
          $state.go('event-list');
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    vm.gotoActivityList = function () {
      $state.go('activity-list');
    }
  }

})();