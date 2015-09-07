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
    url: 'MeteringFacade.wsdl',
    urn: 'GetMeterReadings'
  }, {
    type: 'DB',
    url: 'ISCuDb',
    urn: 'QueryDeliveryPoint'
  }], function(err){
    Entity.find({}).remove(function() {
      IntegrationPoint.find({}, function(err, integrationPoints){
        Entity.create([{
          name: 'MeterReading',
          type: 'OSB',
          description: 'Service for querying meter readings from ISCu',
          producing: [],
          consuming: [integrationPoints[0]._id, integrationPoints[1]._id]
        }, {
          name: 'ISCu',
          type: 'OSB',
          description: 'Service for querying meter readings from ISCu',
          producing: [integrationPoints[0]._id],
          consuming: []
        }, {
          name: 'ISCuDB',
          type: 'OSB',
          description: 'Service for querying meter readings from ISCu',
          producing: [integrationPoints[1]._id],
          consuming: []
        }], function(err, entities){
          integrationPoints[0].entity = entities[1]._id;
          integrationPoints[0].save()
          integrationPoints[1].entity = entities[2]._id;
          integrationPoints[1].save()
        })
      });
    });
  });
});

FixedValues.find({}).remove(function() {
  FixedValues.create([{
    entityTypes: ['OSB','SCA','Java', 'External'],
    integrationPointTypes: ['SOAP', 'REST','FTP', 'FileAdapter', 'POP3', 'DB']
  }])
});

