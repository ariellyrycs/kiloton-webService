'use strict';
/*globals require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    interaction = new Schema({
        comment: {
            type    : String,
            require : true
        },
        weight: {
            type    : String,
            require : true
        },
        image: {
            type    : String,
            require : true
        },
        date: {
            type    : Date,
            require : true
        },
        registrationDate: {
            type    : Date,
            require : true
        },
        modified: {
            type    : Date,
            default : Date.now
        }
    });

module.exports = mongoose.model('interaction', interaction);