(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityAddCtrl', control);

  control.$inject = [];

  function control() {

    var vm = angular.extend(this, {
      activity: {
        id: new Date().getTime().toString(),
        name: '',
        description: '',
        units: '',
        minLegalValue: '',
        maxLegalValue: ''
      }
    });

    

  }

})();