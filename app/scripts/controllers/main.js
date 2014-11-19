'use strict';

/**
 * @ngdoc function
 * @name lensApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lensApp
 */
angular.module('lensApp')
  .controller('MainCtrl', function ($scope, $resource, _) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.fetch = function(){
      $scope.showWarning = false;
      $resource('http://localhost:5984/workflow_service_docstore_dev/_all_docs?include_docs=true').get(function(a){
        $scope.docsByType = _.chain(a.rows).map('doc').groupBy('docType').value();
        $scope.docTypes = _.without(Object.keys($scope.docsByType), "undefined");
        $scope.docTypeAttrs = _.reduce($scope.docTypes, function(r, type){r[type] = _.chain($scope.docsByType[type]).map(function(a){
            return Object.keys(a)}
        ).flatten().uniq().without("_rev", "docType").value(); return r;}, {});
      }, function(x){
        $scope.showWarning = true;
      });
    }

    $scope.fetch();
  });
