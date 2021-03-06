'use strict';
/*globals require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserShema = new Schema({
        accessToken: {
            type    : String,
            require : true
        },
        idProfile: {
            type    : String
        },
        name: {
            type    : String,
            require : true
        },
        modified: {
            type    : Date,
            default : Date.now
        }
});

module.exports = mongoose.model('user', UserShema);