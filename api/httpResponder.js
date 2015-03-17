/**
 * Created by arobles on 3/13/15.
 */
/*globals module*/
'use strict';
module.exports = {
    setup: function (res) {
        return function (err, response) {
            if(err) {
                res.json(err);
            } else {
                res.json(response);
            }
        };
    }
};