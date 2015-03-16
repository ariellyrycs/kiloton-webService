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
        },
        sprint: {
            type: Schema.ObjectId,
            ref: 'sprint'
        }
});

module.exports = mongoose.model('user', UserShema);