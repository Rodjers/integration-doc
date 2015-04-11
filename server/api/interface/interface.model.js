'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InterfaceSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Interface', InterfaceSchema);