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
    findByIdProfile: function(req, res) {
        return User.find({ idProfile: req.params.id}, function(err, user) {
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
            name:    req.body.name
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
        return User.findOne({idProfile: req.params.id}, function(err, user) {
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
        return User.find({idProfile: req.params.id}, function(err, user) {
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
        User.findOne({idProfile: req.params.uId}, function(err, user) {
            var error;
            if (user) {
                next();
            } else {
                error = new Error('cannot find user ' + req.params.uId);
                error.status = 404;
                res.send(error);
            }
        });
    },
    statusUserExistence: function (req, res) {
        User.findOne({idProfile: req.params.uId}, function(err, user) {
            var error;
            if(err) {
                error = new Error('cannot find user ' + req.params.uId);
                error.status = 404;
                res.send(error);
            }
            if (user) {
                res.send({
                    exists: true
                });
            } else {
                res.send({
                    exists: false
                });
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
        Sprint.findOne({user: req.params.uId}, function (err, sprints) {
            if (sprints && !err) {
                if (sprints._id) {
                    Interaction.find({sprint: req.params.sId}, function (err, interactions) {
                        if (!err) {
                            return res.send({status: 'OK', interactions: interactions});
                        } else {
                            res.statusCode = 500;
                            return res.send({error: 'Server error'});
                        }
                    });
                } else {
                    res.statusCode = 404;
                    return res.send({error: 'Not found'});
                }
            } else {
                res.statusCode = 500;
                return res.send({error: 'Server error'});
            }
        });
    },
    findAllUsersNoRelative: function (res, interactions, sprints) {
        User.find({}, function (err, users) {
            if(err) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            var userObject = [],
                tmpObj;
            for(var key in users) {
                if(users.hasOwnProperty(key)) {
                    tmpObj = {
                        _id: users[key]._id,
                        accessToken: users[key].accessToken,
                        idProfile: users[key].idProfile,
                        name: users[key].name,
                        modified: users[key].modified,
                        sprints: findSprintsByUsersId(users[key]._id, sprints, interactions)
                    };
                    userObject.push(tmpObj);
                }
            }
            return res.send({status: 'OK', users: userObject});
        });
    }
};

function findSprintsByUsersId(idUser, sprints, interactions) {
    var sprintObject = [],
        tmpObj;
    for(var key in sprints) {
        if(sprints.hasOwnProperty(key) && sprints[key].user.toString() == idUser.toString()) {
            tmpObj = {
                _id: sprints[key]._id,
                currentDate: sprints[key].currentDate,
                lastDate: sprints[key].lastDate,
                currentWeight: sprints[key].currentWeight,
                weightObjective: sprints[key].weightObjective,
                image: sprints[key].image,
                user: sprints[key].user,
                modified: sprints[key].modified,
                interactions: findInteractionsBySprintsId(sprints[key]._id, interactions)
            };
            sprints.splice(key, 1);
            sprintObject.push(tmpObj);
        }
    }
    return sprintObject;
}

function findInteractionsBySprintsId(idSprint, interactions) {
    var interactionObject = [];
    for(var key in interactions) {
        if(interactions.hasOwnProperty(key) && interactions[key].sprint.toString() === idSprint.toString()) {
            interactionObject.push(interactions.splice(key, 1)[0]);
        }
    }
    return interactionObject;
}