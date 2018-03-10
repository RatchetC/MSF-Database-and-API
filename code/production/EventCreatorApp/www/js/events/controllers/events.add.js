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
      vm.loading = true;
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          vm.loading = false;
          $ionicPopup.alert({
            title: 'Success!',
            template: 'Your event has been saved!'
          });
          $state.go('event-list');
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    vm.gotoActivityList = function gotoActivityList() {
      vm.loading = true;
      eventsSrvc.postEvent(vm.event).then(
        function success(postedEvent) {
          eventsSrvc.addEvent(postedEvent);
          vm.loading = false;
          $state.go('activity-list', { eventID: postedEvent.id });
        },
        function failure(error) {
          console.error(error);
        }
      );
    };
    
  }

})();