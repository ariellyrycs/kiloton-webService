/* globals module, require*/

'use strict';
var User = require('./../models/userModel'),
    Sprint = require('./../models/sprintModel'),
    Interaction = require('./../models/interactionModel');

module.exports = {
    findAllUsers: function(req, res) {
        return User.find(function(err, users) {
            if(!err) {
                return res.send({status: 'OK', users:users});
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    findById: function(req, res) {
        return User.findById(req.params.id, function(err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(!err) {
                return res.send({ status: 'OK', user:user });
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    addUser: function(req, res) {
        var user = new User({
            accessToken:    req.body.accessToken,
            idProfile :    req.body.idProfile,
            name:    req.body.name,
            active: req.body.active
        });
        user.save(function(err) {
            var toPrint = null;
            if(err) {
                console.log('Error while saving user: ' + err);
                res.send({ error:err });
            } else {
                console.log("User created");
                toPrint =  res.send({ status: 'OK', user:user });
            }
            return toPrint;
        });
    },
    updateUser: function(req, res) {
        return User.findById(req.params.id, function(err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (req.body.accessToken !== null) {
                user.accessToken = req.body.accessToken;
            }
            if (req.body.idProfile !== null) {
                user.idProfile = req.body.idProfile;
            }
            if (req.body.name !== null) {
                user.name = req.body.name;
            }
            if (req.body.name !== null) {
                user.active = req.body.active;
            }
            return user.save(function(err) {
                if(!err) {
                    console.log('Updated');
                    return res.send({ status: 'OK', user:user });
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
                return res.send(user);
            });
        });
    },
    deleteUser: function(req, res) {
        return User.findById(req.params.id, function(err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return user.remove(function(err) {
                if(!err) {
                    console.log('Removed user');
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    console.error('Error', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    },
    checkUserExistence: function (req, res, next) {
        User.findById(req.params.uId, function(err, user) {
            var error;
            if (user) {
                next();
            } else {
                error = new Error('cannot find user ' + req.params.uId);
                error.status = 404;
                return res.send(error);
            }
        });
    },
    findAllSprintsByUser: function (req,res) {
        Sprint.find({ user: req.params.uId }, function (err, sprints) {
            if(!err) {
                return res.send({status: 'OK', sprints:sprints});
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    findAllInteractionBySprint: function (req, res) {
        Sprint.findOne({ user: req.params.uId }, function (err, sprints) {
            if(sprints && (sprints[0] || sprints._id) && !err) {
                Interaction.find({ sprint: req.params.sId }, function (err, interactions) {
                    if(!err) {
                        return res.send({status: 'OK', interactions:interactions});
                    } else {
                        res.statusCode = 500;
                        console.error('Error', res.statusCode, err.message);
                        return res.send({ error: 'Server error' });
                    }
                });
            } else {
                res.statusCode = 500;
                return res.send({ error: 'Server error' });
            }
        });
    }
};