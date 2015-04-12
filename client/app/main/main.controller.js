'use strict';

angular.module('integrationDocApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.entities = [];

    $http.get('/api/entities').success(function(entities) {
      $scope.entities = entities;
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
  });
