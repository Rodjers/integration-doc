'use strict';

var _ = require('lodash');
var Interface = require('./interface.model');

// Get list of interfaces
exports.index = function(req, res) {
  Interface.find(function (err, interfaces) {
    if(err) { return handleError(res, err); }
    return res.json(200, interfaces);
  });
};

// Get a single interface
exports.show = function(req, res) {
  Interface.findById(req.params.id, function (err, interface) {
    if(err) { return handleError(res, err); }
    if(!interface) { return res.send(404); }
    return res.json(interface);
  });
};

// Creates a new interface in the DB.
exports.create = function(req, res) {
  Interface.create(req.body, function(err, interface) {
    if(err) { return handleError(res, err); }
    return res.json(201, interface);
  });
};

// Updates an existing interface in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Interface.findById(req.params.id, function (err, interface) {
    if (err) { return handleError(res, err); }
    if(!interface) { return res.send(404); }
    var updated = _.merge(interface, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, interface);
    });
  });
};

// Deletes a interface from the DB.
exports.destroy = function(req, res) {
  Interface.findById(req.params.id, function (err, interface) {
    if(err) { return handleError(res, err); }
    if(!interface) { return res.send(404); }
    interface.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}