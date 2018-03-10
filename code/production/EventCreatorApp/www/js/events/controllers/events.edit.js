(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'eventsSrvc', 'eventActivityMappingsSrvc', 'selectedEvent', 'activities', 'mappings'];

  function control($state, $ionicPopup, eventsSrvc, eventActivityMappingsSrvc, selectedEvent, activities, mappings) {

    var vm = angular.extend(this, {
      title: 'Edit Event',
      btnSaveText: 'Save Changes To Event',
      event: selectedEvent,
      activities: activities,
      noActivities: false,
      loading: false
    });

    function init() {
      if (vm.activities.length === 0) {
        vm.noActivities = true;
      }
    }

    init();

    vm.save = function save() {
      vm.loading = true;
      eventsSrvc.putEvent(vm.event).then(
        function success(data) {
          eventsSrvc.updateEvent(data);
          vm.loading = false;
          $ionicPopup.alert({
            title: 'Success!',
            template: 'Your changes have been saved!'
          });
          $state.go('event-list');
        },
        function failure(error) {
          $ionicPopup.alert({
            title: 'Error',
            template: 'An error occurred when trying to save your changes. Please check your internet connection and try again.'
          });
        }
      );
    };

    vm.gotoActivityList = function gotoActivityList() {
      $state.go('activity-list', { eventID: $state.params.eventID });
    };

    vm.deleteActivityFromEvent = function deleteActivityFromEvent(activityID) {
      $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete this activity from your event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          for (var i = 0; i < vm.activities.length; i++) {
            if (vm.activities[i].id === activityID) {
              vm.activities.splice(i, 1);
            }
          }
          if (vm.activities.length === 0) {
            vm.noActivities = true;
          }
          for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].activity === activityID) {
              eventActivityMappingsSrvc.deleteEventActivityMapping(mappings[j].id);
            }
          }
        }
      });
    };

  }

})();