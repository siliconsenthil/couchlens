'use strict';

/**
 * @ngdoc function
 * @name lensApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lensApp
 */
angular.module('lensApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
