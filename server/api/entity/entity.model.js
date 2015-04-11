'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntitySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Entity', EntitySchema);