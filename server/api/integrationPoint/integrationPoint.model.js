'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IntegrationPointSchema = new Schema({
  type: String,
  url: String,
  urn: String
});

module.exports= mongoose.model('IntegrationPoint', IntegrationPointSchema);