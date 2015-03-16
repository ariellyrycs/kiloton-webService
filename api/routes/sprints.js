/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/

var controllers = require('./../controllers/sprintsController'),
    userController = require('./../controllers/usersController');
module.exports = function(app) {
    app.get('/sprints', controllers.findAllSprints);
    app.get('/user/:userId/sprint/:sprintId', [userController.checkUserExistence, controllers.findById]);
    app.post('/user/:userId/sprint/', [userController.checkUserExistence, controllers.addSprint]);
    app.put('/user/:userId/sprint/:sprintId', [userController.checkUserExistence, controllers.updateSprint]);
    app.delete('/user/:userId/sprint/:sprintId', [userController.checkUserExistence, controllers.deleteSprint]);
};