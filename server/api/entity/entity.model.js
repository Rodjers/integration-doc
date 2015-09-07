'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntitySchema = new Schema({
  name: String,
  type: String,
  description: String,
  producing: [{type: Schema.Types.ObjectId, ref: 'IntegrationPoint'}],
  consuming: [{type: Schema.Types.ObjectId, ref: 'IntegrationPoint'}]
});

module.exports = mongoose.model('Entity', EntitySchema);