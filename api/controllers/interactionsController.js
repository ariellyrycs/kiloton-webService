/* globals module, require*/

'use strict';
var Interaction = require('./../models/interactionModel'),
    Sprint = require('./../models/sprintModel'),
    sprintController = require('./sprintsController');
module.exports = {
    findAllInteractions: function(req, res) {
        return Interaction.find(function(err, interactions) {
            if(!err) {
                return res.send({status: 'OK', interactions:interactions});
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    findById: function(req, res) {
        Interaction.findById(req.params.iId, function(err, interaction) {
            Sprint.populate(interaction, { path: 'sprint' }, function(err, sprint) {
                var error;
                if(!sprint || !sprint.sprint || sprint.sprint._id != req.params.sId || err) {
                    error = new Error('cannot find interaction ' + req.params.sId);
                    error.status = 404;
                    return res.send(error);
                } else {
                    return res.send({ status: 'OK', interaction:interaction });
                }
            });
        });
    },
    addInteraction: function(req, res) {
        var interaction = new Interaction({
            comment:            req.body.comment,
            weight :            req.body.weight,
            image:              req.body.image,
            date:               req.body.date,
            registrationDate:   req.body.registrationDate,
            sprint:             req.params.sId
        });
        interaction.save(function(err) {
            var toPrint = null;
            if(err) {
                console.log('Error while saving interaction: ' + err);
                res.send({ error:err });
            } else {
                console.log("Interaction created");
                toPrint =  res.send({ status: 'OK', interaction:interaction });
            }
            return toPrint;
        });
    },
    updateInteraction: function(req, res) {
        Interaction.findById(req.params.iId, function(err, interaction) {
            Sprint.populate(interaction, { path: 'sprint' }, function(err, sprint) {
                var error;
                if(!sprint || !sprint.sprint || sprint.sprint._id != req.params.sId || err) {
                    error = new Error('cannot find interaction ' + req.params.sId);
                    error.status = 404;
                    return res.send(error);
                } else {
                    if (req.body.comment !== null) {
                        interaction.comment = req.body.comment;
                    }
                    if (req.body.weight !== null) {
                        interaction.weight = req.body.weight;
                    }
                    if (req.body.image !== null) {
                        interaction.image = req.body.image;
                    }
                    if (req.body.date !== null) {
                        interaction.date = req.body.date;
                    }
                    if (req.body.registrationDate !== null) {
                        interaction.registrationDate = req.body.registrationDate;
                    }
                    return interaction.save(function(err) {
                        if(!err) {
                            console.log('Updated');
                            return res.send({ status: 'OK', interaction:interaction });
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
                        return res.send(interaction);
                    });
                }
            });
        });
    },
    deleteInteraction: function(req, res) {
        Interaction.findById(req.params.iId, function(err, interaction) {
            Sprint.populate(interaction, { path: 'sprint' }, function(err, sprint) {
                var error;
                if(!sprint || !sprint.sprint || sprint.sprint._id != req.params.sId || err) {
                    error = new Error('cannot find interaction ' + req.params.sId);
                    error.status = 404;
                    return res.send(error);
                } else {
                    return interaction.remove(function(err) {
                        if(!err) {
                            console.log('Removed interaction');
                            return res.send({ status: 'OK' });
                        } else {
                            res.statusCode = 500;
                            console.error('Error', res.statusCode, err.message);
                            return res.send({ error: 'Server error' });
                        }
                    });
                }
            });
        });
    },

    findAll: function (req, res) {
        Interaction.find({}, function (err, interactions) {
            if(err) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            sprintController.findAllSprintsNoRelative(res, interactions);
        });
    },
    newInteractions: function (req, res, next) {
        var date = new Date(decodeURIComponent(req.query['date']));
        Interaction
            .count({modified: {"$gte": date}})
            .exec(function (err, number) {
                if(!err && number) {
                    next();
                } else {
                    res.send({
                        status:404
                    });
                }
            });
    },
    getInteractionsOfUser: function (req, res) {
        Interaction
            .find({})
            .populate('sprint', null, {user: {$in: [req.params.uId]}})
            .exec(function (err, interactions) {
                if (!err) {
                    res.send({
                        status: 'OK',
                        interactions: interactions
                    });
                } else {
                    res.send({
                        status: 404
                    });

                }
            });
    }
};
