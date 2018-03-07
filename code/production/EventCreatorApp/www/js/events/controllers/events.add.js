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