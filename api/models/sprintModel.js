'use strict';
/*globals require*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    sprint = new Schema({
        currentDate: {
            type    : Date,
            require : true
        },
        lastDate: {
            type    : Date,
            require : true
        },
        currentWeight: {
            type    : String,
            require : true
        },
        weightObjective: {
            type    : String,
            require : true
        },
        image: {
            type    : String,
            require : true
        },
        modified: {
            type    : Date,
            default : Date.now
        }
    });

module.exports = mongoose.model('sprint', sprint);