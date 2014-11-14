'use strict';

/**
 * @ngdoc function
 * @name lensApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lensApp
 */
angular.module('lensApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
