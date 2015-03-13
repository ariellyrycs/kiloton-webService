/* globals module*/

'use strict';
var User = require('./../models/userModel.js');
module.exports = {
    findAllUsers: function(req, res) {
        return User.find(function(err, pets) {
            if(!err) {
                return res.send({status: 'OK', pets:pets});
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    findById: function(req, res) {
        return User.findById(req.params.id, function(err, pet) {
            if(!pet) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if(!err) {
                return res.send({ status: 'OK', pet:pet });
            } else {
                res.statusCode = 500;
                console.error('Error', res.statusCode, err.message);
                return res.send({ error: 'Server error' });
            }
        });
    },
    addUser: function(req, res) {
        console.log(req.body);
        var User = new User({
            animal:    req.body.animal,
            age :    req.body.age,
            color:    req.body.color
        });
        User.save(function(err) {
            var toPrint = null;
            if(err) {
                console.log('Error while saving pet: ' + err);
                res.send({ error:err });
            } else {
                console.log("Pet created");
                toPrint =  res.send({ status: 'OK', pet:pet });
            }
            return toPrint;
        });
    },
    updateUser: function(req, res) {
        return User.findById(req.params.id, function(err, pet) {
            if(!User) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (req.body.animal !== null) {
                pet.animal = req.body.animal;
            }
            if (req.body.age !== null) {
                pet.age = req.body.age;
            }
            if (req.body.color !== null) {
                pet.color = req.body.color;
            }
            return User.save(function(err) {
                if(!err) {
                    console.log('Updated');
                    return res.send({ status: 'OK', pet:pet });
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
                return res.send(pet);
            });
        });
    },
    deleteUser: function(req, res) {
        return User.findById(req.params.id, function(err, pet) {
            if(!User) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return User.remove(function(err) {
                if(!err) {
                    console.log('Removed pet');
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    console.error('Error', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    }
};