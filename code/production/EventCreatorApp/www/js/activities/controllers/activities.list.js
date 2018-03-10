(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$timeout', 'activitiesSrvc', 'eventActivityMappingsSrvc', 'thisEventsMappings'];

  function control($state, $ionicPopup, $timeout, activitiesSrvc, eventActivityMappingsSrvc, thisEventsMappings) {

    var vm = angular.extend(this, {
      activities: [],
      loading: true,
      blurContent: false
    });

    console.log(thisEventsMappings);

    function init() {
      activitiesSrvc.getAllActivities().then(
        function success(data) {
          vm.activities = data;
          vm.loading = false;
        },
        function failure(error) {
          console.error(error);
          $ionicPopup.alert({
            title: 'Error',
            template: 'Failed to load the activities. Please check your internet connection and try again.'
          });
          $state.go('event-edit', { eventID: $state.params.eventID } );
        }
      );
    }

    init();

    // vm.gotoEditActivityScreen = function gotoEditActivityScreen(activityID) {
    //   $state.go('activity-edit', { activityID: activityID } );
    // };

    // vm.deleteActivity = function deleteActivity(activityID) {
    //   $ionicPopup.confirm({
    //     title: 'Delete Activity',
    //     template: 'Are you sure you want to delete this activity?'
    //   }).then(function (res) {
    //     if (res === true) {
    //       activitiesSrvc.deleteActivity(activityID);
    //     }
    //   });
    // };

    vm.addActivityToEvent = function addActivityToEvent(activity) {

      for (var i = 0; i < thisEventsMappings.length; i++) {
        if (thisEventsMappings[i].activity === activity.id) {
          vm.blurContent = true;
          $ionicPopup.alert({
            title: 'Duplicate Activity',
            template: 'This activity has already been added to your event. There is no need to add it twice.'
          }).then(
            function (res) {
              if (res) {
                vm.blurContent = false;
              }
            }
          );
          return;
        }
      }

      var mapping = {
        id: new Date().getTime().toString(),
        event: $state.params.eventID,
        activity: activity.id
      };

      $ionicPopup.confirm({
        title: 'Add Activity To Event',
        template: 'Are you sure you want to add ' + activity.name + ' to your event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          vm.loading = true;
          eventActivityMappingsSrvc.postEventActivityMapping(mapping).then(
            function success(postedMapping) {
              eventActivityMappingsSrvc.addEventActivityMapping(postedMapping);
              $timeout(function () {
                $state.go('event-edit', { eventID: $state.params.eventID });
              }, 1000);
            },
            function failure(error) {
              console.log(error);
              $ionicPopup.alert({
                title: 'Error',
                template: 'Failed to add the activity to your event. Please check your internet connection and try again.'
              });
            }
          );
        }
      });

    };

  }

})();