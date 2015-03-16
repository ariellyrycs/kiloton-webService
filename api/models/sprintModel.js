'use strict';
/*globals require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SprintSchema = new Schema({
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
        },
        user: {
            type: Schema.ObjectId,
            ref: 'user'
        },
        interaction: {
            type: Schema.ObjectId,
            red: 'interaction'
        }
    });

module.exports = mongoose.model('sprint', SprintSchema);