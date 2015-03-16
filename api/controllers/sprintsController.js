/* globals module, require*/

'use strict';
var Sprint = require('./../models/sprintModel.js');
var User = require('./../models/userModel.js');
module.exports = {
    findAllSprints: function(req, res) {
        return Sprint.find(function(err, sprints) {
            if(!err) {
                return res.send({status: 'OK', sprints:sprints});
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    findById: function(req, res) {
        Sprint.findById(req.params.sprintId, function(err, sprint) {
            User.populate(sprint, { path: 'user' }, function(err, user) {
                if(!user || !user.user || user.user._id != req.params.userId) {
                    res.statusCode = 404;
                    return res.send({ error: 'Not found' });
                }
                if(!err) {
                    return res.send({ status: 'OK', sprint:sprint});
                } else {
                    res.statusCode = 500;
                    console.error('Error', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    },
    addSprint: function(req, res) {
        var sprint = new Sprint({
            currentDate:    req.body.currentDate,
            lastDate :      req.body.lastDate,
            currentWeight:  req.body.currentWeight,
            weightObjective:req.body.weightObjective,
            image:          req.body.image,
            user:           req.params.userId
        });
        sprint.save(function(err) {
            var toPrint = null;
            if(err) {
                console.log('Error while saving sprint: ' + err);
                res.send({ error:err });
            } else {
                console.log("Sprint created");
                toPrint =  res.send({ status: 'OK', sprint:sprint });
            }
            return toPrint;
        });
    },
    updateSprint: function(req, res) {
        Sprint.findById(req.params.sprintId, function(err, sprint) {
            User.populate(sprint, { path: 'user' }, function(err, user) {
                if(!user || !user.user || user.user._id != req.params.userId) {
                    res.statusCode = 404;
                    return res.send({error: 'Not found'});
                } else if(!err) {
                    if (req.body.currentDate !== null) {
                        sprint.currentDate = req.body.currentDate;
                    }
                    if (req.body.lastDate !== null) {
                        sprint.lastDate = req.body.lastDate;
                    }
                    if (req.body.currentWeight !== null) {
                        sprint.currentWeight = req.body.currentWeight;
                    }
                    if (req.body.weightObjective !== null) {
                        sprint.weightObjective = req.body.weightObjective;
                    }
                    if (req.body.image !== null) {
                        sprint.image = req.body.image;
                    }
                    return sprint.save(function(err) {
                        if(!err) {
                            console.log('Updated');
                            return res.send({ status: 'OK', sprint:sprint });
                        } else {
                            if(err.name === 'ValidationError') {
                                res.statusCode = 400;
                                res.send({ error: 'Validation error' });
                            } else {
                                res.statusCode = 500;
                                res.send({ error: 'Server error' });
                            }
                            console.error('Error',res.statusCode,err.message);
                        }
                        return res.send(sprint);
                    });
                } else {
                    res.statusCode = 500;
                    console.error('Error', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    },
    deleteSprint: function(req, res) {
        Sprint.findById(req.params.sprintId, function(err, sprint) {
            User.populate(sprint, {path: 'user'}, function (err, user) {
                if(!user || !user.user || user.user._id != req.params.userId) {
                    res.statusCode = 404;
                    return res.send({error: 'Not found'});
                } else if(!err) {
                    return sprint.remove(function(err) {
                        if(!err) {
                            console.log('Removed sprint');
                            return res.send({ status: 'OK' });
                        } else {
                            res.statusCode = 500;
                            console.error('Error', res.statusCode, err.message);
                            return res.send({ error: 'Server error' });
                        }
                    });
                } else {
                    res.statusCode = 500;
                    console.error('Error', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    },
    checkSprintExistence: function (req, res, next) {
        Sprint.findById(req.params.sprintId, function(err, user) {
            var error;
            if (user) {
                next();
            } else {
                error = new Error('cannot find sprint ' + req.params.sprintId);
                error.status = 404;
                return res.send(error);
            }
        });
    }
};