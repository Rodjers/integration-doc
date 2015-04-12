'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FixedvaluesSchema = new Schema({
  entityTypes: [String],
  integrationPointTypes: [String]
});

module.exports = mongoose.model('Fixedvalues', FixedvaluesSchema);