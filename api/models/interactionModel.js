'use strict';
/*globals require, module*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    InteractionSchema = new Schema({
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
        },
        sprint: {
            type: Schema.ObjectId,
            ref: 'sprint'
        }
    });
module.exports = mongoose.model('interaction', InteractionSchema);