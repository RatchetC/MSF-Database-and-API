(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityListCtrl', control);

  control.$inject = ['$state', 'activitiesSrvc'];

  function control($state, activitiesSrvc) {

    var vm = angular.extend(this, { activities: [] });

    function init() {
      activitiesSrvc.getAllActivities().then(
        function success(data) {
          vm.activities = data;
        },
        function failure(error) {
          console.error(error);
          // TODO: show popup and move back to previous screen / home screen
        }
      );
    }

    init();

    vm.gotoEditActivityScreen = function gotoEditActivityScreen(activityID) {
      $state.go('activity-edit', { activityID: activityID } );
    };

    vm.deleteActivity = function deleteActivity(activityID) {
      $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete this activity?'
      }).then(function (res) {
        if (res === true) {
          activitiesSrvc.deleteActivity(activityID);
        }
      });
    };

  }

})();