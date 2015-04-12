/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Entity = require('../api/entity/entity.model');
var IntegrationPoint = require('../api/integrationPoint/integrationPoint.model');
var FixedValues = require('../api/fixedValues/fixedValues.model');

IntegrationPoint.find({}).remove(function() {
  IntegrationPoint.create([{
    type: 'SOAP',
    url: 'AssetInterface.wsdl',
    urn: 'QueryAssetById'
  }, {
    type: 'SOAP',
    url: 'Customer.wsdl',
    urn: 'QueryCustomer'
  }, {
    type: 'SOAP',
    url: 'ActorInterface.wsdl',
    urn: 'QueryActor'
  }], function(err){
    Entity.find({}).remove(function() {
      IntegrationPoint.find({}, function(err, integrationPoints){
        Entity.create({
          name: 'CustomerPS',
          type: 'Proxy',
          description: 'Service for querying a customer from Siebel and ISCu',
          producing: [integrationPoints[1]._id],
          consuming: [integrationPoints[0]._id, integrationPoints[2]._id]
        })
      });
    });
  });
});

FixedValues.find({}).remove(function() {
  FixedValues.create([{
    entityTypes: ['Proxy','SCA','Java'],
    integrationPointTypes: ['SOAP', 'FTP', 'FileAdapter', 'POP3']
  }])
});

