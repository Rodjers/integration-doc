'use strict';

var _ = require('lodash');
var Fixedvalues = require('./fixedValues.model');

// Get list of fixedValuess
exports.index = function(req, res) {
  Fixedvalues.find(function (err, fixedValuess) {
    if(err) { return handleError(res, err); }
    return res.json(200, fixedValuess);
  });
};

// Get a single fixedValues
exports.show = function(req, res) {
  Fixedvalues.findById(req.params.id, function (err, fixedValues) {
    if(err) { return handleError(res, err); }
    if(!fixedValues) { return res.send(404); }
    return res.json(fixedValues);
  });
};

// Creates a new fixedValues in the DB.
exports.create = function(req, res) {
  Fixedvalues.create(req.body, function(err, fixedValues) {
    if(err) { return handleError(res, err); }
    return res.json(201, fixedValues);
  });
};

// Updates an existing fixedValues in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fixedvalues.findById(req.params.id, function (err, fixedValues) {
    if (err) { return handleError(res, err); }
    if(!fixedValues) { return res.send(404); }
    var updated = _.merge(fixedValues, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, fixedValues);
    });
  });
};

// Deletes a fixedValues from the DB.
exports.destroy = function(req, res) {
  Fixedvalues.findById(req.params.id, function (err, fixedValues) {
    if(err) { return handleError(res, err); }
    if(!fixedValues) { return res.send(404); }
    fixedValues.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}