/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/

var controllers = require('./../controllers/sprintsController.js');
module.exports = function(app) {
 app.get('/sprints', controllers.findAllSprints);
 app.get('/sprint/:id', controllers.findById);
 app.post('/sprint', controllers.addSprint);
 app.put('/sprint/:id', controllers.updateSprint);
 app.delete('/sprint/:id', controllers.deleteSprint);
};