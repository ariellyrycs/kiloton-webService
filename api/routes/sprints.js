/**
 * Created by arobles on 3/13/15.
 */

/*globals module, require*/

var controllers = require('./../controllers/sprintsController'),
    userController = require('./../controllers/usersController');
module.exports = function(app) {
    app.get('/sprints', controllers.findAllSprints);
    app.get('/user/:uId/sprint/:sprintId', [userController.checkUserExistence, controllers.findById]);
    app.post('/user/:uId/sprint/', [userController.checkUserExistence, controllers.addSprint]);
    app.put('/user/:uId/sprint/:sprintId', [userController.checkUserExistence, controllers.updateSprint]);
    app.delete('/user/:uId/sprint/:sprintId', [userController.checkUserExistence, controllers.deleteSprint]);

    //newSprint related to the date
    app.get('/user/:uId/sprints/news', controllers.newUsers);
};