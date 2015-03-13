'use strict';
/*globals require*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    user = new Schema({
        accessToken: {
            type    : String,
            require : true
        },
        idProfile: {
            type    : String,
            require : true
        },
        name: {
            type    : String,
            require : true
        },
        active: {
            type    : Boolean,
            require : true
        },
        modified: {
            type    : Date,
            default : Date.now
        }
});

module.exports = mongoose.model('user', user);