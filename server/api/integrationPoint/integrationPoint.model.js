'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IntegrationPointSchema = new Schema({
  type: String,
  url: String,
  urn: String,
  entity: {type: Schema.Types.ObjectId, ref: 'Entity'}
});

module.exports= mongoose.model('IntegrationPoint', IntegrationPointSchema);