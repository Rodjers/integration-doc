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

    $scope.createData = function() {
      var nodes = [];
      var edges = [];
      for(var n = 0; n < $scope.entities.length; n++){
        nodes[n] = {
          id: $scope.entities[n]._id,
          label: $scope.entities[n].name,
          title: $scope.entities[n].description
        };
        for(var i = 0; i < $scope.entities[n].consuming.length; i++){
          var edge = {
            from: $scope.entities[n]._id,
            to: _.find($scope.integrationPoints, {_id: $scope.entities[n].consuming[i]._id}).entity,
            label: _.find($scope.integrationPoints, {_id: $scope.entities[n].consuming[i]._id}).urn
          }
          edges.splice(1,0,edge);
        }
      }
      $scope.data = {
        nodes: nodes,
        edges: edges
      }
    }

    $scope.options = {
      physics: {
        enabled: false
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'LR',
          sortMethod: 'directed',
          levelSeparation: 300
      }
      },
      edges: {
        arrows: {
          to: {
            enabled: true
          }
        },
        smooth: {
          enabled: false
        }
      }

    };

    $scope.draw = function() {
    // create an an object with an array of nodes and an array of edges
    $scope.createData();

    // create a network
    $scope.container = document.getElementById('mynetwork');

    // provide the data in the vis format
    //$scope.data = {
    //    nodes: $scope.nodes,
    //    edges: $scope.edges
    //};
    

    // initialize your network!
    $scope.network = new vis.Network($scope.container, $scope.data, $scope.options);
    }
  });
