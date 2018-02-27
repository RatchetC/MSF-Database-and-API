(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', 'eventsSrvc'];

  function control($state, eventsSrvc) {

    var vm = angular.extend(this, { 
      event: {}
      // loading: false
    });

    vm.saveEvent = function () {
      // vm.loading = true;
      eventsSrvc.postEvent(vm.event).then(
        function success(data) {
          eventsSrvc.addEvent(data);
          $state.go('event-list');
          console.log(data);
        },
        function failure(error) {
          console.error(error);
        }
      );
    }
  }

})();