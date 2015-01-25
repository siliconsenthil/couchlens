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

    var errorFn = function () {
      $scope.showWarning = true;
    };

    var noDataFoundFn = function () {
      $scope.error = true;
    };

    $resource('http://localhost:5984/_all_dbs').query(function(data){
      $scope.allDbs = _.without(data, '_replicator','_users');
      $scope.currentDb = 'workflow_service_docstore_dev';
      $scope.fetch();
    }, errorFn);


    $scope.fetch = function(){
      $scope.showWarning = false;
      $scope.docTypes = [];
      $resource('http://localhost:5984/'+$scope.currentDb+'/_all_docs?include_docs=true').get(function(data){
        $scope.docsByType = _.chain(data.rows).map('doc').groupBy('docType').value();
        $scope.docTypes = _.without(Object.keys($scope.docsByType), 'undefined');
        $scope.docTypeAttrs = _.reduce($scope.docTypes, function(r, type){r[type] = _.chain($scope.docsByType[type]).map(function(a){
            return Object.keys(a);}
        ).flatten().uniq().without('_rev', 'docType', 'createdAt', 'updatedAt').push('createdAt', 'updatedAt').value(); return r;}, {});
        $scope.resetDocumentSelection();
      }, errorFn);
    };

    $scope.getDocTypes = function() {
      if($scope.selectedDocType) {
        return $scope.selectedDocType;
      } else {
        return $scope.docTypes;
      }
    };

    $scope.fetchByDocId = function() {
      if($scope.docId && $scope.docId !== '') {
        $resource('http://localhost:5984/'+$scope.currentDb+'/'+$scope.docId).get(function(data) {
            $scope.error = false;
            $scope.document = data;
            $scope.noDocumentSelected = false;
            $scope.selectedDocType = [$scope.document.docType];
        }, noDataFoundFn);
      }
    };

    $scope.resetDocumentSelection = function() {
      $scope.document = undefined;
      $scope.noDocumentSelected = true;
      $scope.selectedDocType = undefined;
    };

  });
