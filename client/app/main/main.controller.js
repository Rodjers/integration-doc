'use strict';

angular.module('integrationDocApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.newEntity = {
      producing: [],
      consuming: []
    }

    $scope.entities = [];

    $http.get('/api/entities').success(function(entities) {
      $scope.entities = entities;
    });

    $http.get('/api/fixedValuess').success(function(fixedValues) {
      $scope.fixedValues = fixedValues;
    });

    $scope.integrationPoints = [];

    $http.get('/api/integrationPoints').success(function(integrationPoints) {
      $scope.integrationPoints = integrationPoints;
    });

    $scope.addIntegrationPoint = function(newIntegrationPoint) {
      $http.post('/api/integrationPoints', newIntegrationPoint).success(function(data){
        $scope.integrationPoints.push(data);
        $scope.newIntegrationPoint = {};
      })
    }
    $scope.addEntity = function(newEntity) {
      $http.post('/api/entities', newEntity).success(function(data){
        $http.get('/api/entities').success(function(entities) {
          $scope.entities = entities;
          $scope.newEntity = {};
        });
        
      })
    }
  });
