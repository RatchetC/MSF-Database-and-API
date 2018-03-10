(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityAddCtrl', control);

  control.$inject = ['$ionicHistory', 'activitiesSrvc'];

  function control($ionicHistory, activitiesSrvc) {

    var vm = angular.extend(this, {
      activity: {
        id: new Date().getTime().toString(),
        name: '',
        description: '',
        units: '',
        minLegalValue: '',
        maxLegalValue: ''
      },
      loading: false
    });

    vm.save = function save() {
      vm.loading = true;
      activitiesSrvc.postActivity(vm.activity).then(
        function success(postedActivity) {
          activitiesSrvc.addActivity(postedActivity);
          vm.loading = false;
          $ionicHistory.goBack();
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

  }

})();