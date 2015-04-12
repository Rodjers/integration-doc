'use strict';

var _ = require('lodash');
var Integrationpoint = require('./integrationPoint.model');

// Get list of integrationPoints
exports.index = function(req, res) {
  Integrationpoint.find(function (err, integrationPoints) {
    if(err) { return handleError(res, err); }
    return res.json(200, integrationPoints);
  });
};

// Get a single integrationPoint
exports.show = function(req, res) {
  Integrationpoint.findById(req.params.id, function (err, integrationPoint) {
    if(err) { return handleError(res, err); }
    if(!integrationPoint) { return res.send(404); }
    return res.json(integrationPoint);
  });
};

// Creates a new integrationPoint in the DB.
exports.create = function(req, res) {
  Integrationpoint.create(req.body, function(err, integrationPoint) {
    if(err) { return handleError(res, err); }
    return res.json(201, integrationPoint);
  });
};

// Updates an existing integrationPoint in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Integrationpoint.findById(req.params.id, function (err, integrationPoint) {
    if (err) { return handleError(res, err); }
    if(!integrationPoint) { return res.send(404); }
    var updated = _.merge(integrationPoint, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, integrationPoint);
    });
  });
};

// Deletes a integrationPoint from the DB.
exports.destroy = function(req, res) {
  Integrationpoint.findById(req.params.id, function (err, integrationPoint) {
    if(err) { return handleError(res, err); }
    if(!integrationPoint) { return res.send(404); }
    integrationPoint.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}