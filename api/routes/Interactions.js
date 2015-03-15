/**
 * Created by arobles on 3/13/15.
 */
/*globals require, module*/

var controllers = require('./../controllers/interactionsController.js');
module.exports = function(app) {
 app.get('/interactions', controllers.findAllInteractions);
 app.get('/interaction/:id', controllers.findById);
 app.post('/interaction', controllers.addInteraction);
 app.put('/interaction/:id', controllers.updateInteraction);
 app.delete('/interaction/:id', controllers.deleteInteraction);
};